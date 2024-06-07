import "./single-user-grades.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
//import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
//import { useGetCompletedDictationsForSpecificUserMutation } from "../../sentDictations/sentDictationsApiSlice";
import { MdCheck, MdClose } from "react-icons/md";
import { useGetAllDictationsForSpecificUserMutation } from "../../dictations/sentDictations/sentDictationsApiSlice";
import useAuth from "../../../hooks/useAuth";
import Search from "../../../components/search/Search";
const SingleUserGrades = () => {
    const { userId } = useParams()
    const [getAllDictationsForUser, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetAllDictationsForSpecificUserMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const navigate = useNavigate()
    useEffect(() => {
        if (userId) {
            getAllDictationsForUser({ user:userId})
            
        }
    }, [])
    if (isLoading) return <h1> טוען נתונים</h1>
    if (isError) return <h1>{error.data.massage}</h1>
    const filteredData = dictationsObject ? (q ? dictationsObject.data.filter(dictationFU => (dictationFU.dictation.name?.indexOf(q) > -1)) : dictationsObject.data) : [];
   return (
        <div className="dictations-for-student-list">

            <div className="-dictations-for-student-top">
                <Search placeholder="Search for a dictation..." />
            </div>
            <table className="dictations-for-student-list-table">
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
                            <td>{dictationFU.dictation?.name}</td>
                            <td  >{dictationFU.completed ? (
                                <MdCheck />
                            ) : (
                                <MdClose />
                            )}</td>
                            <td>{dictationFU.score}</td>
                            <td>
                                <div className="dictations-for-student-list-buttons">
                                <Link className='dictations-for-students-list-button complete-dictations-for-student-list-view' to={`/dash/dictations/sent/answers/${dictationFU._id}`}>
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

export default SingleUserGrades