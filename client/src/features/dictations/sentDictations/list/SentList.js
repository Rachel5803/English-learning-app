import "./sent-list.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from "react"
import { useGetAllClassesQuery } from "../../../classes/classesApiSlice";
import { useGetAllSentDictationsQuery } from "../sentDictationsApiSlice";
import { useGetAllUsersQuery } from "../../../users/usersApiSlice";
import Search from "../../../../components/search/Search";
import { MdCheck,MdClose } from "react-icons/md";
const SentList = () => {
    const { data: dictationsObject, isError, error, isLoading, isSuccess } = useGetAllSentDictationsQuery()
    //const { data: classesObject, isLoading: isClassesLoading } = useGetAllClassesQuery()
    const { data: usersObject, isLoading: isUsersLoading } = useGetAllUsersQuery()
    const [searchParams] = useSearchParams()
    const [complete, setComplete] = useState(false)
    const q = searchParams.get("q")
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q ? [...dictationsObject.data] : dictationsObject.data.filter(dictation => (dictation.user.class.school+" "+dictation.user.class.grade?.indexOf(q) > -1) || (dictation.name.indexOf(q) > -1) || (dictation.user.name?.indexOf(q) > -1))


    return (
        <div className="sent-dictations-list">

            <div className="sent-dictations-list-top">
                <Search placeholder="Search for a dictation..." />
            </div>
            <table className="sent-dictations-list-table">
                <thead>
                    <tr>
                        <td>שם ההכתבה</td>
                        <td>שם התלמיד</td>
                        <td>כיתה</td>
                        <td>הושלם</td>
                        <td>ציון</td>
                        <td>תאריך שליחה</td>
                        <td>תאריך הגשה</td>


                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((dictationFU) => (
                        <tr key={dictationFU.id}>
                            <td>{dictationFU.dictation?.name}</td>
                            <td>{dictationFU.user?.name}</td>

                            <td>{dictationFU.user?.class?.school + " " + dictationFU.user?.class?.grade + " " + dictationFU.user?.class?.gradeNumber + " " + dictationFU.user?.class?.schoolYear}</td>
                            <td  >{dictationFU.completed ? (
                                <MdCheck/>
                            ) : (
                                <MdClose  />
                            )}</td>
                            <td>{dictationFU.score}</td>
                            <td>{dictationFU.createdAt?.toString().slice(4, 16)}</td>
                            <td>{dictationFU.endDate}</td>
                            <td>
                                <div className="sent-dictations-list-buttons">
                                    <Link className='sent-dictations-list-button sent-dictations-list-view' to={`/dash/dictations/sent/${dictationFU._id}`}>
                                        צפה במילים
                                    </Link>
                                    <Link className='sent-dictations-list-button sent-dictations-list-view' to={`/dash/dictations/sent/answers/${dictationFU._id}`}>
                                        צפה בתשובות
                                    </Link>

                                    <button className="sent-dictations-list-button sent-dictations-list-update">
                                        עדכן ציון
                                    </button>
                                    <button className="sent-dictations-list-button sent-dictations-list-update">
                                        עדכן תאריך הגשה
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

export default SentList