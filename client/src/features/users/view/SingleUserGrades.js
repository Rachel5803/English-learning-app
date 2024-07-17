import "./single-user-grades.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MdCheck, MdClose, MdOutlineCancelPresentation } from "react-icons/md";
import { useGetAllDictationsForSpecificUserMutation } from "../../dictations/sentDictations/sentDictationsApiSlice";
import useAuth from "../../../hooks/useAuth";
import Search from "../../../components/search/Search";
const SingleUserGrades = () => {
    const { userId } = useParams()
    const [getAllDictationsForUser, { isSuccess, data: dictationsObject, isError, error, isLoading }] = useGetAllDictationsForSpecificUserMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const navigate = useNavigate()
    const [ShowAverage, setShowAverage] = useState(false);
    const [average, setAverage] = useState(0);
    useEffect(() => {
        if (userId) {
            getAllDictationsForUser({ user: userId })

        }
    }, [])
    const calculateAverage = () => {
        if (!filteredData.length) {
            setAverage(0)
            setShowAverage(true)
            return
        }
        const sum = filteredData.reduce((total, dictation) => total + dictation.score, 0)
        const average = Math.round(sum / filteredData.length);
        setAverage(average)
        setShowAverage(true)
        
    };

    if (isLoading) return <div className="error-page"> טוען נתונים</div>
    if (isError) return <div className="error-page">{error.data.massage}</div>
    const filteredData = dictationsObject ? (q ? dictationsObject.data.filter(dictationFU => (dictationFU.dictation.name?.indexOf(q) > -1)) : dictationsObject.data) : [];
    return (
        <div className="dictations-for-student-list">

            <div className="dictations-for-student-list-top">
                <Search placeholder="חיפוש לפי שם הכתבה" />
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
            <button className='dictations-for-students-list-buttonShow ' onClick={() => { calculateAverage() }}> חשב ממוצע</button>
            <div className="change_update">
                {ShowAverage && (
                    <div className="dictations-for-students-list-average">
                        <div className="dictations-for-students-list-container">
                            <button className='dictations-for-students-list-close' onClick={() => { setShowAverage(!ShowAverage) }}><MdOutlineCancelPresentation /></button>
                            <h2 className="dictations-for-students-list-view-average">
                        הממוצע הוא: {average}
                            </h2>
                           
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleUserGrades