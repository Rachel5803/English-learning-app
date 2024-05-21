import "./single-dictation-to-answer.css"

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllSentDictationsFromAllUsersQuery, useGetNotCompletedDictationsForSpecificUserMutation, useUpdateDictationForSpecificUserMutation } from "../../sentDictations/sentDictationsApiSlice";
import useAuth from "../../../../hooks/useAuth";
const SingleDictationToAnswer = () => {
    const { _id } = useAuth()
    const { dictationId } = useParams()
    const [getAllNotCompleteStudentDictations, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetNotCompletedDictationsForSpecificUserMutation()
    //const [newInputsArray, setNewInputsArray] = useState([])
    //const newInpuesArray=[]
    const [updateDictation, { isSuccess: isUpdateSuccess }] = useUpdateDictationForSpecificUserMutation()
    const navigate = useNavigate()
    const [dictationWordsAns, setDictationWordsAns] = useState([])
    const [compareDictationWordsAns, setCompareDictationWordsAns] = useState([])
    const [precentPerWord, setPrecentPerWord] = useState(0)
    let localScore = 0
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

    const formSubmit = (e) => {
        e.preventDefault()
        scoreCalculation()
        const updateSingledictation = { ...singledictation, dictationWordsAnswers: dictationWordsAns,completed:true, score: Math.ceil(localScore) }
        // const data = new FormData(e.target)
        // const dictationObject = Object.fromEntries(data.entries())
        // const dictationAnswers = [];
        // for (let i = 0; i < data.getAll('word').length; i++) {
        //     const word = data.getAll('word')[i];
        //     const meanings = data.getAll('meaning')[i].split(", ");
        //     dictationAnswers.push({ word, meanings });
        // }
        // dictationObject.dictationWordsAnswers = dictationAnswers;
        console.log(localScore);
        updateDictation(updateSingledictation)

    }
    const scoreCalculation = () => {
       
        let flag = false
        dictationWordsAns.map((obj, index) => {
            if(obj.meanings!=""){
                obj.meanings?.map(word => {
                    if (compareDictationWordsAns[index].meanings.includes(word) && flag === false) {
                        console.log("נמצאו ערכים זהים");
                        localScore += precentPerWord
                        flag = true
                    }
                })
            }
           
            flag = false
        })
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
        dictationWordsAns[index] = { ...dictationWordsAns[index], meanings: e.target.value.split(", ") }
    }

    const gfgfg = () => {
        console.log(dictationWordsAns);
    }
    const singledictation = dictationsObject?.data.find(dictation => dictation._id === dictationId)
    useEffect(() => {
        if (singledictation) {
            setDictationWordsAns(randomArray(singledictation.dictationWords))
        }
    }, [singledictation])
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    if (!singledictation) return <h1>{"Not found"}</h1>


    return (
        <div className="single-draft-container">
            <div className="single-draft-form-container">
                <form onSubmit={formSubmit} className="single-draft-form">
                    <input name="_id" defaultValue={singledictation._id} type="hidden" />
                    <label>{singledictation.name}</label>



                    <table className="draft-word-dictation-list-table">
                        <thead>
                            <tr>
                                <td>מילה</td>
                                <td>פרושים</td>
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
                                    placeholder="הכנס פרוש"
                                    onChange={(e) => insertMeaning(e, index)}
                                /></td>

                            </tr>

                        ))}



                        </tbody>
                    </table>

                    <button >עדכן</button>
                </form>
            </div>
        </div>
    )
}

export default SingleDictationToAnswer