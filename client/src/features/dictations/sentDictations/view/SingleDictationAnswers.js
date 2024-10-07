import "./single-dictation-answers.css"
import { useGetAllSentDictationsFromAllUsersQuery } from "../sentDictationsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdCheck,MdClose } from "react-icons/md";
const SingleDictationAnswers = () => {

    const { dictationId } = useParams()
    const { data: sentDictatoinsObject, isError, error, isLoading, isSuccess } = useGetAllSentDictationsFromAllUsersQuery()
    if (isLoading ) return <div className="error-page"> Loading</div>
    if (isError) return <div className="error-page">{error.data.massage}</div>
    const singledictation = sentDictatoinsObject.data.find(dictation => dictation._id === dictationId)
    if (!singledictation) return  <h1> Dictation not found </h1>
    if(singledictation.dictationWordsAnswers.length==0) return <div className="error-page"> Dictation not completed </div>
    return (
        <div className="single-dictation-container">
            <div className="single-dictation-answers-container">
            <table className="single-dictation-answers-table">
                        <thead>
                            <tr>
                                <td>word</td>
                                <td>translation</td>
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