import "./single-dictation-words.css"

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllSentDictationsQuery } from "../../draftsDictations/draftsApiSlice";
const SingleDictationWords = () => {

    const { dictationId } = useParams()
    const { data: sentDictatoinsObject, isError, error, isLoading, isSuccess } = useGetAllSentDictationsQuery()
    
    

    if (isLoading ) return <div className="error-page"> Loading ...</div>
    if (isError) return <div className="error-page">{JSON.stringify(error)}</div>
    const singledictation = sentDictatoinsObject.data.find(dictation => dictation._id === dictationId)
    if (!singledictation) return <h1>{"Not found"}</h1>
    return (
        <div className="single-dictation-container">
            <div className="single-dictation-words-container">
            <table className="single-dictation-words-table">
                        <thead>
                            <tr>
                                <td>מילה</td>
                                <td>תרגום</td>
                            </tr>
                        </thead>
                        <tbody> {singledictation.dictationWords?.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.word}</td>
                                <td>{obj.meanings ? obj.meanings.join(", ") : ""}</td>

                            </tr>

                        ))}
                        </tbody>
                    </table>
               
            </div>
        </div>
    )
}

export default SingleDictationWords