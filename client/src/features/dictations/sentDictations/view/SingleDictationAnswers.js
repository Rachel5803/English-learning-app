import "./single-dictation-answers.css"
import { useGetAllSentDictationsFromAllUsersQuery } from "../sentDictationsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdCheck,MdClose } from "react-icons/md";
const SingleDictationAnswers = () => {

    const { dictationId } = useParams()
    const { data: sentDictatoinsObject, isError, error, isLoading, isSuccess } = useGetAllSentDictationsFromAllUsersQuery()
    
    
    

    if (isLoading ) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const singledictation = sentDictatoinsObject.data.find(dictation => dictation._id === dictationId)
    if (!singledictation) return <h1>{"Not found"}</h1>
    return (
        <div className="single-dictation-container">
            <div className="single-dictation-answers-container">
            <table className="single-dictation-answers-table">
                        <thead>
                            <tr>
                                <td>מילה</td>
                                <td>פרושים</td>
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