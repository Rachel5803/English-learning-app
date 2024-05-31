import "./students-list-for-dictation.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from "react"
import { useEffect } from 'react';
import {
    useGetDictationFromAllUsersInClassMutation
    , useUpdateDictationForSpecificUserMutation
} from "../sentDictationsApiSlice";
import Search from "../../../../components/search/Search";
import { MdCheck, MdClose } from "react-icons/md";
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";

const StudentsListForDictation = () => {
    const { dictationId } = useParams()
    const [updateSingleDictation, { isSuccess: isUpdateSuccess }] = useUpdateDictationForSpecificUserMutation()
    const [getAllStudentsDictations, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetDictationFromAllUsersInClassMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const [isModalDateOpen, setIsModalDateOpen] = useState(false);
    const [isModalScoreOpen, setIsModalScoreOpen] = useState(false);
    const [specificDictation, setSpecificDictation] = useState("");
    const [updateDate, setUpdateDate] = useState(new Date());
    const [updateScore, setUpdateScore] = useState(0);
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate("/dash/dictations/drafts")
    //     }

    // }, [isSuccess])
    useEffect(() => {
        if (dictationId) {
            getAllStudentsDictations({ dictation: dictationId })
        }
    }, [isUpdateSuccess])
    const showDateInput = (dictation) => {
        setIsModalDateOpen(!isModalDateOpen)
        setSpecificDictation(dictation)
    }
    const showScoreInput = (dictation) => {
        setIsModalScoreOpen(!isModalScoreOpen)
        setSpecificDictation(dictation)
    }
    const clickUpdateDate = (dictation) => {
        updateSingleDictation({
            _id: dictation._id, dictationWordsAnswers: dictation.dictationWordsAnswers,
            completed: dictation.completed, score: dictation.score, endDate: updateDate
        })


    }
    const clickUpdateScore = (dictation) => {
        updateSingleDictation({
            _id: dictation._id, dictationWordsAnswers: dictation.dictationWordsAnswers,
            completed: dictation.completed, score: updateScore, endDate: dictation.endDate
        })

    }
    const handleDateChange = (newDate) => {
        setUpdateDate(newDate)

    };
    const handleScoreChange = (newScore) => {
        setUpdateScore(newScore)

    };


    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = dictationsObject ? (q ? dictationsObject.data.filter(dictation => (dictation.user.name?.indexOf(q) > -1)) : dictationsObject.data) : [];
    return (
        <div className="sent-dictation-from-all-users-list">

            <div className="sent-dictation-from-all-users-list-top">
                <Search placeholder="Search for a user..." />
            </div>
            <table className="sent-dictation-from-all-users-list-table">
                <thead>
                    <tr>
                        <td>שם התלמיד</td>
                        <td>הושלם</td>
                        <td>ציון</td>

                        <td>תאריך שליחה</td>
                        <td>תאריך הגשה</td>


                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((dictationFU) => (
                        <tr key={dictationFU._id}>
                            <td>{dictationFU.user.name}</td>
                            <td  >{dictationFU.completed ? (
                                <MdCheck />
                            ) : (
                                <MdClose />
                            )}</td>

                            <td>{dictationFU.score}</td>
                            <td>{moment(dictationFU.createdAt).format('DD-MM-YYYY')}</td>

                            <td> {dictationFU.endDate ? moment(dictationFU.endDate).format('DD-MM-YYYY') : ""}</td>
                            <td>
                                <div className="sent-dictation-from-all-users-list-buttons">
                                    <Link className='sent-dictation-from-all-users-list-button sent-dictation-from-all-users-list-view' to={`/dash/dictations/sent/answers/${dictationFU._id}`}>
                                        צפה בתשובות
                                    </Link>

                                    <button className='sent-dictation-from-all-users-list-button sent-dictation-from-all-users-list-view' onClick={() => { showScoreInput(dictationFU) }}>עדכן ציון</button>


                                    <button className='sent-dictation-from-all-users-list-button sent-dictation-from-all-users-list-view' onClick={() => { showDateInput(dictationFU) }}>עדכן תאריך הגשה</button>

                                    {isModalDateOpen && dictationFU === specificDictation && (
                                        <div className="sent-dictation-from-all-users-list-change">
                                            <input
                                                type="date"
                                                name="endDate"
                                                placeholder="בחר תאריך הגשה"
                                                className='sent-dictation-from-all-users-list-change-input '
                                                onChange={(e) => { handleDateChange(e.target.value) }}
                                            />
                                            <button className='sent-dictation-from-all-users-list-update' onClick={() => { clickUpdateDate(dictationFU) }}>עדכן</button>
                                        </div>
                                    )}
                                    {isModalScoreOpen && dictationFU === specificDictation && (
                                        <div className="sent-dictation-from-all-users-list-change">
                                            <input
                                                defaultValue={dictationFU.score}
                                                type="number"
                                                name="score"
                                                placeholder="הכנס ציון"
                                                className='sent-dictation-from-all-users-list-change-input'
                                                onChange={(e) => { handleScoreChange(e.target.value) }}
                                            />
                                            <button className='sent-dictation-from-all-users-list-update' onClick={() => { clickUpdateScore(dictationFU) }}>עדכן</button>
                                        </div>
                                    )}

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default StudentsListForDictation