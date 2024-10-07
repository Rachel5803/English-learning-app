import "./single-dictation-to-answer.css"

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetNotCompletedDictationsForSpecificUserMutation, useUpdateDictationForSpecificUserMutation } from "../../sentDictations/sentDictationsApiSlice";
import useAuth from "../../../../hooks/useAuth";
const SingleDictationToAnswer = () => {
    const { _id } = useAuth()
    const { dictationId } = useParams()
    const [getAllNotCompleteStudentDictations, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetNotCompletedDictationsForSpecificUserMutation()
    const [updateDictation, { isSuccess: isUpdateSuccess }] = useUpdateDictationForSpecificUserMutation()
    const navigate = useNavigate()
    const [remainingTime, setRemainingTime] = useState(0)
    const [isActive, setIsActive] = useState(true);
    const [dictationWordsAns, setDictationWordsAns] = useState([])
    const [compareDictationWordsAns, setCompareDictationWordsAns] = useState([])
    const [precentPerWord, setPrecentPerWord] = useState(0)
    
    let localScore = 0
    const dictationEndTime = new Date().getTime() + remainingTime * 1000;
    const formSubmit = (e) => {
        if (e) {
            if(window.confirm("Are you sure you want to submit the dictation?")){
                e.preventDefault()
                scoreCalculation()
                const updateSingledictation = { ...singledictation, dictationWordsAnswers: dictationWordsAns, completed: true, score: Math.ceil(localScore) }
                updateDictation(updateSingledictation)
            
            }
            else{
                e.preventDefault()
            }
               
        }
        else {
            scoreCalculation()
            const updateSingledictation = { ...singledictation, dictationWordsAnswers: dictationWordsAns, completed: true, score: Math.ceil(localScore) }
            updateDictation(updateSingledictation)
        }

        
    }
    const timeOver = () => {
        alert("Time is Up,  The dictation has been submitted");
        formSubmit()
        if (isUpdateSuccess) {
            navigate("/dash/dictations")
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (_id) {
            getAllNotCompleteStudentDictations({ user: _id })
        }
    }, [])
    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/dash/dictations")
        }
    }, [isUpdateSuccess])
    useEffect(() => {
        if (remainingTime > 0) {
            const intervalId = setInterval(() => {
                const now = new Date().getTime();
                const timeLeft = Math.floor((dictationEndTime - now) / 1000);
                setRemainingTime(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(intervalId);
                    timeOver();
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [remainingTime, dictationEndTime]);

    const scoreCalculation = () => {
        let flag = false
        dictationWordsAns.map((obj, index) => {
            if (obj.meanings != "") {
                obj.meanings?.map(word => {
                    if (compareDictationWordsAns[index].meanings.includes(word) && flag === false) {
                        localScore += precentPerWord
                        flag = true
                        obj.correct = true
                    }
                })
            }

            flag = false
        })
        if(localScore>100){
            localScore=100
        }
    }
    const randomArray = (arr) => {
        setPrecentPerWord(100 / arr.length)
        let dictationWordsRandom = [...arr];
        for (let i = dictationWordsRandom.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dictationWordsRandom[i], dictationWordsRandom[j]] = [dictationWordsRandom[j], dictationWordsRandom[i]];
        }
        setCompareDictationWordsAns([...dictationWordsRandom])
        dictationWordsRandom = dictationWordsRandom.map(obj => {
            return { ...obj, meanings: "" }
        })
        return dictationWordsRandom
    }
    const insertMeaning = (e, index) => {
        dictationWordsAns[index] = { ...dictationWordsAns[index], meanings: e.target.value.split(",").map(meaning => meaning.trim()) }
    }


    const singledictation = dictationsObject?.data.find(dictation => dictation._id === dictationId)
    useEffect(() => {
        if (singledictation) {
            setDictationWordsAns(randomArray(singledictation.dictationWords))
            setRemainingTime(singledictation.dictation.limitTime* 60)
        }
    }, [singledictation])
    if (isLoading) return <div className="error-page" > Loading ...</div >
    if (isError) return <div className="error-page" >{JSON.stringify(error)}</div >
    if (!singledictation) return <div className="error-page">{"Not found"}</div >


    return (
        <div className="single-draft-container">
            <h1>{singledictation.name}</h1>
            <div className="single-draft-form-container">
                <form onSubmit={formSubmit} className="single-draft-form" >
                    <input name="_id" defaultValue={singledictation._id} type="hidden" />
                    <p>Time Remaining: {formatTime(remainingTime)}</p>


                    <table className="draft-word-dictation-list-table">
                        <thead>
                            <tr>
                                <td>word</td>
                                <td>translation</td>
                            </tr>
                        </thead>
                        <tbody> {dictationWordsAns?.map((obj, index) => (
                            <tr key={index}>
                                <td >

                                    {obj.word}

                                </td>

                                <td> <input
                                    type="text"
                                    defaultValue={""}
                                    name="meaning"
                                    placeholder="enter translation "
                                    onChange={(e) => insertMeaning(e, index)}
                                /></td>

                            </tr>

                        ))}



                        </tbody>
                    </table>

                    <button >Submission</button>
                </form>
            </div>
        </div>
    )
}

export default SingleDictationToAnswer