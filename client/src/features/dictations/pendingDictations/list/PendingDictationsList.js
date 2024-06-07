import "./pending-dictations-list.css"
import { Link, useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';

import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useGetNotCompletedDictationsForSpecificUserMutation, useUpdateDictationForSpecificUserMutation } from "../../sentDictations/sentDictationsApiSlice";
import Search from "../../../../components/search/Search";

const PendingDictationsList = () => {
    const { _id } = useAuth()
    const navigate=useNavigate()
    //const { dictationId } = useParams()
    //const [updateSingleDictation, { isSuccess: isUpdateSuccess }] = useUpdateDictationForSpecificUserMutation()
    const [getAllNotCompleteStudentDictations, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetNotCompletedDictationsForSpecificUserMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    //const navigate = useNavigate()
    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate("/dash/dictations/drafts")
    //     }

    // }, [isSuccess])
    useEffect(() => {
        if (_id) {
            getAllNotCompleteStudentDictations({ user: _id })
        }
    }, [])
    const confrimStartDictation = (dictationFU) => {
        if(window.confirm("בטוח שברצונך להתחיל ניסיון מענה?")){
            navigate(`/dash/dictations/to/answer/${dictationFU._id}`);
        }
    };
    if (isLoading) return <h1> טוען נתונים</h1>
    if (isError) return  <h1>{error.data.massage}</h1>
    const filteredData = dictationsObject ? (q ? dictationsObject.data.filter(dictation => (dictation.name?.indexOf(q) > -1)) : dictationsObject.data) : [];
    return (
        <div className="dictations-for-student-list">

            <div className="dictations-for-student-list-top">

                <Search placeholder="Search for a dictation..." />
            </div>
            <table className="dictations-for-student-list-table">
                <thead>
                    <tr>
                        <td>שם ההכתבה</td>
                        <td>תאריך הגשה</td>
                        <td>הגבלת זמן</td>
                        


                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((dictationFU) => (
                        <tr key={dictationFU._id}>
                            <td>{dictationFU.dictation.name}</td>
                            <td> {dictationFU.endDate ? moment(dictationFU.endDate).format('DD-MM-YYYY') : ""}</td>
                            <td>{dictationFU.dictation.limitTime?dictationFU.dictation.limitTime+" דקות":""}</td>
                            <td>
                                <div className="dictations-for-student-list-buttons">
                                    <Link className='dictations-for-student-list-button dictations-for-student-list-view' to={`/dash/dictations/sent/words/${dictationFU.dictation._id}`}>
                                        צפה במילים
                                    </Link>
                                    <button
                                        className="dictations-for-student-button sent-dictation-from-all-users-list-view"
                                        onClick={ ()=>{confrimStartDictation(dictationFU)}}>
                                        התחלת ניסיון מענה
                                    </button>
                                    </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default PendingDictationsList