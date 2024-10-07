import "./single-draft.css"

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllDraftsQuery, useUpdateDraftMutation } from "../draftsApiSlice";
import { useGetAllActiveClassesQuery } from "../../../classes/classesApiSlice";
import { format } from 'date-fns';
const SingleDraft = () => {

    const { draftId } = useParams()
    const { data: draftsObject, isError, error, isLoading, isSuccess } = useGetAllDraftsQuery()
    const [newInputsArray, setNewInputsArray] = useState([])
    const { data: classes, isLoading: isClassesLoading } = useGetAllActiveClassesQuery()
    const [updateDraft, { isSuccess: isUpdateSuccess }] = useUpdateDraftMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/dash/dictations/drafts")
        }
    }, [isUpdateSuccess])
    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const draftObject = Object.fromEntries(data.entries())
        const updatedDictationWords = [];
        for (let i = 0; i < data.getAll('word').length; i++) {
            const word = data.getAll('word')[i].trim()
            const meanings = data.getAll('meaning')[i].split(",").map(meaning => meaning.trim())
            console.log("word:  "+word+"meaimgs: "+meanings);
            if (word != "" || meanings != "") {
                updatedDictationWords.push({ word, meanings });
            }
        }
        draftObject.dictationWords = updatedDictationWords;

        updateDraft(draftObject)

    }
    const addInput = () => {
        setNewInputsArray([...newInputsArray, ""])
    };
    const DateTimeFormatter = (endDate) => {
        if (!endDate) {
            const today = new Date();
            return format(today, 'yyyy-MM-dd')
        }
        const date = new Date(endDate);
        return date.toISOString().split('T')[0]
    }

    if (isLoading || isClassesLoading) return <div> Loading ...</div>
    if (isError) return <div className="error-page"><h1>{JSON.stringify(error)}</h1></div>
    const singledraft = draftsObject.data.find(draft => draft._id === draftId)
    if (!singledraft) return <div className="error-page">{"Not found"}</div>
    return (
        <div className="single-draft-container">
            <div className="single-draft-form-container">
                <form onSubmit={formSubmit} className="single-draft-form">
                    <input name="_id" defaultValue={singledraft._id} type="hidden" />
                    <label>dictation name </label>
                    <input
                        defaultValue={singledraft.name}
                        type="text"
                        name="name"
                        placeholder="enter dictation name"
                        required
                    />
                    <label>class</label>
                    <select name="classId" id="classId" required>
                        {classes.data.map(oneClass => {
                            return <option selected={oneClass._id === singledraft.class?._id} value={oneClass._id}>{oneClass.school + " " + oneClass.grade + " " + oneClass.gradeNumber + " " + oneClass.schoolYear}</option>

                        })}
                    </select>
                    <label>submission data </label>
                    <input
                        defaultValue={singledraft.endDate?DateTimeFormatter(singledraft.endDate):"dd/mm/yyyy"}
                        
                        type="date"

                        name="endDate"


                    />
                    <label> limit time</label>
          <input
            defaultValue={singledraft.limitTime}
            type="number"
            name="limitTime"
            placeholder="enter limit time  "
          />
                    <table className="draft-word-dictation-list-table">
                        <thead>
                            <tr>
                                <td>word</td>
                                <td>translation</td>
                            </tr>
                        </thead>
                        <tbody> {singledraft.dictationWords?.map((obj, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={obj.word}
                                        name="word"
                                        placeholder="enter new word "
                                    />
                                </td>

                                <td> <input
                                    type="text"
                                    defaultValue={obj.meanings ? obj.meanings.join(", ") : ""}
                                    name="meaning"
                                    placeholder="enter translation "

                                /></td>

                            </tr>

                        ))}
                            {newInputsArray?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            defaultValue={""}
                                            name="word"
                                            placeholder="enter new word"
                                        />
                                    </td>

                                    <td> <input
                                        type="text"
                                        defaultValue={""}
                                        name="meaning"
                                        placeholder="enter translation"
                                    /></td>

                                </tr>
                            ))}


                           
                        </tbody>
                    </table>
                    <button onClick={addInput} type="button" className="add-input-button" >Add word </button>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleDraft