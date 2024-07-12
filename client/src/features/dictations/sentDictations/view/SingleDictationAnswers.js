import "./single-dictation-answers.css"
import { useGetAllSentDictationsFromAllUsersQuery } from "../sentDictationsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdCheck,MdClose } from "react-icons/md";
const SingleDictationAnswers = () => {

    const { dictationId } = useParams()
    const { data: sentDictatoinsObject, isError, error, isLoading, isSuccess } = useGetAllSentDictationsFromAllUsersQuery()
    
    
    

    if (isLoading ) return <div className="error-page"> טוען נתונים</div>
    if (isError) return <div className="error-page">{error.data.massage}</div>
    const singledictation = sentDictatoinsObject.data.find(dictation => dictation._id === dictationId)
    if (!singledictation) return <h1>"הכתבה לא נמצאה"</h1>
    return (
        <div className="single-dictation-container">
            <div className="single-dictation-answers-container">
            <table className="single-dictation-answers-table">
                        <thead>
                            <tr>
                                <td>מילה</td>
                                <td>תרגום</td>
                            </tr>
                        </thead>
                        <tbody> {singledictation.dictationWordsAnswers?.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.word}</td>
                                <td>{obj.meanings ? obj.meanings.join(", ") : ""}
                                {obj.correct ? (
                                <MdCheck />
                            ) : (
                                <MdClose />
                            )}</td>

                            </tr>

                        ))}
                        </tbody>
                    </table>
               
            </div>
        </div>
    )
}

export default SingleDictationAnswers