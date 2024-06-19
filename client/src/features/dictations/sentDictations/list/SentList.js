import "./sent-list.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from "react"
import { useUpdateDictationEndDateForAllUsersMutation } from "../sentDictationsApiSlice";
import { useDeleteDraftMutation, useGetAllSentDictationsQuery } from "../../draftsDictations/draftsApiSlice";
import Search from "../../../../components/search/Search";
import moment from 'moment';
import { format } from 'date-fns';
import { MdOutlineCancelPresentation } from "react-icons/md";
const SentList = () => {
    const { data: dictationsObject, isError, error, isLoading, isSuccess } = useGetAllSentDictationsQuery()
    const [updateEndDate, { isSuccess: isUpdateSuccess }] = useUpdateDictationEndDateForAllUsersMutation()
    const [deleteDraft, { isSuccess: isDeleteSuccess }] = useDeleteDraftMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specificDictation, setSpecificDictation] = useState("");
    const [updateDate, setUpdateDate] = useState(new Date());
    const DateTimeFormatter = (endDate) => {
        if (!endDate) {
            const today = new Date();
            return format(today, 'yyyy-MM-dd')
        }
        const date = new Date(endDate);
        return date.toISOString().split('T')[0]
    }
    const showDateInput = (dictation) => {
        setIsModalOpen(!isModalOpen)
        setSpecificDictation(dictation)
    }
    const clickUpdate = (dictation) => {
        updateEndDate({ classId: dictation.class, dictation: dictation._id, endDate: updateDate })
        setIsModalOpen(!isModalOpen)
    }


    const handleDateChange = (newDate) => {
        setUpdateDate(newDate)

    };
    const deleteClick = (dictation) => {
    
        if (window.confirm("שים לב, ההכתבה תמחק לכל התלמידים בכיתה. בטוח שברצונך למחוק הכתבה זו?")) {
            deleteDraft({ _id: dictation._id })
        }


    }

    if (isLoading) return <div className="error-page"> Loading ...</div>
    if (isError) return <div className="error-drafts-list">
        <h1>{error.data.massage}</h1>
   </div>
    console.log("kkkk" + dictationsObject.data[1]);
    const filteredData = !q ? [...dictationsObject.data] : dictationsObject.data.filter(dictation => (dictation.class?.school + " " + dictation.class?.grade?.indexOf(q) > -1) || (dictation.name.indexOf(q) > -1) || (dictation.user?.name?.indexOf(q) > -1))


    return (
        <div className="sent-dictations-list">
            <div className="sent-dictations-list-top">
                <Search placeholder="Search for a dictation..." />
            </div>
            <h1 className="sent-dictations-list-title">הכתבות שנשלחו</h1>
            <table className="sent-dictations-list-table">
                <thead>
                    <tr>
                        <td>שם ההכתבה</td>

                        <td>כיתה</td>
                        <td>תאריך שליחה</td>
                        <td>תאריך הגשה</td>
                        <td>הגבלת זמן</td>


                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((dictationFU) => (
                        <tr key={dictationFU.id}>
                            <td>{dictationFU.name}</td>

                            <td>{dictationFU.class?.school + " " + dictationFU.class?.grade + " " + dictationFU.class?.gradeNumber + " " + dictationFU.class?.schoolYear}</td>

                            <td>{dictationFU.sentDate ? moment(dictationFU.sentDate).format('DD-MM-YYYY') : ""}</td>

                            <td> {dictationFU.endDate ? moment(dictationFU.endDate).format('DD-MM-YYYY') : ""}</td>
                            <td>{dictationFU.limitTime ? dictationFU.limitTime + " דקות" : ""}</td>
                            <td>
                                <div className="sent-dictations-list-buttons">
                                    <Link className='sent-dictations-list-button sent-dictations-list-view' to={`/dash/dictations/sent/words/${dictationFU._id}`}>
                                        צפה במילים
                                    </Link>
                                    <Link className='sent-dictations-list-button sent-dictations-list-view' to={`/dash/dictations/sent/${dictationFU._id}`}>
                                        צפה בנתוני התלמידים
                                    </Link>



                                    <button className='sent-dictations-list-button sent-dictations-list-view' onClick={() => { showDateInput(dictationFU) }}>עדכן תאריך הגשה</button>

                                    {isModalOpen && dictationFU == specificDictation && (
                                        <div className="sent-dictations-list-choose-date">
                                            <input
                                                type="date"
                                                name="endDate"
                                                defaultValue={dictationFU.endDate?DateTimeFormatter(dictationFU.endDate):"dd/mm/yyyy"}
                                                className='sent-dictations-list-date-input '
                                                onChange={(e) => { handleDateChange(e.target.value) }}
                                            />
                                            <button className='sent-dictations-list-update-date' onClick={() => { clickUpdate(dictationFU) }}>עדכן</button>
                                            <button className='sent-dictations-list-update-date-close' onClick={() => { setIsModalOpen(!isModalOpen) }}><MdOutlineCancelPresentation /></button>
                                        </div>
                                    )}
                                    <button onClick={() => { deleteClick(dictationFU) }} className="sent-dictations-button sent-dictations-list-delete">
                                        מחיקה
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