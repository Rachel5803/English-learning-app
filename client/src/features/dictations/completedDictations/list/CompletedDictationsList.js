import "./completed-dictations-list.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from "react"
import { useEffect } from 'react';
// import {
//     useGetDictationFromAllUsersInClassMutation
//     , useUpdateDictationForSpecificUserMutation
// } from "../sentDictationsApiSlice";
//import Search from "../../../../components/search/Search";
//import { MdCheck, MdClose } from "react-icons/md";
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompletedDictationsForSpecificUserMutation } from "../../sentDictations/sentDictationsApiSlice";
import useAuth from "../../../../hooks/useAuth";
import Search from "../../../../components/search/Search";
import { MdCheck, MdClose } from "react-icons/md";
const CompletedDictationsList = () => {
    const {_id} = useAuth()
    const [getAllCompleteDictationsForUser, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetCompletedDictationsForSpecificUserMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const navigate = useNavigate()
    useEffect(() => {
        if (_id) {
            getAllCompleteDictationsForUser({ user:_id})
        }
    }, [])
    if (isLoading) return <div className="error-page"> טוען נתונים</div>
    if (isError) return  <div>{error.data.massage}</div>
    const filteredData = dictationsObject ? (q ? dictationsObject.data.filter(dictation => (dictation.name?.indexOf(q) > -1)) : dictationsObject.data) : [];
    return (
        <div className="complete-dictations-for-student-list">

            <div className="complete-dictations-for-student-top">
               
                <Search placeholder="Search for a user..." />
            </div>
            <table className="complete-dictations-for-student-list-table">
                <thead>
                    <tr>
                        <td>שם ההכתבה</td>
                        <td>הושלם</td>
                        <td>ציון</td>
                        </tr>
                </thead>
                <tbody>
                    {filteredData?.map((dictationFU) => (
                        <tr key={dictationFU._id}>
                            <td>{dictationFU.dictation.name}</td>
                            <td  >{dictationFU.completed ? (
                                <MdCheck />
                            ) : (
                                <MdClose />
                            )}</td>
                            <td>{dictationFU.score}</td>
                            <td>
                                <div className="complete-dictations-for-student-list-buttons">
                                <Link className='complete-dictations-for-students-list-button complete-dictations-for-student-list-view' to={`/dash/dictations/sent/words/${dictationFU.dictation._id}`}>
                                        צפה במילים
                                    </Link>
                                    <Link className='complete-dictations-for-students-list-button complete-dictations-for-student-list-view' to={`/dash/dictations/sent/answers/${dictationFU._id}`}>
                                        צפה בתשובות
                                    </Link>
                                     </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default CompletedDictationsList