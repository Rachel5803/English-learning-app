import "./single-draft.css"

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllDraftsQuery, useUpdateDraftMutation } from "../draftsApiSlice";
import { useGetAllClassesQuery } from "../../../classes/classesApiSlice";
const SingleDraft = () => {

    const { draftId } = useParams()
    const { data: draftsObject, isError, error, isLoading, isSuccess } = useGetAllDraftsQuery()

    const [meaningsString, setMeaningsString] = useState("")
    const { data: classes, isLoading: isClassesLoading } = useGetAllClassesQuery()
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
            const word = data.getAll('word')[i];
            const meanings = data.getAll('meaning')[i].split(", ");
            if (word != "" || meanings != "") {
                updatedDictationWords.push({ word, meanings });
            }
        }
        draftObject.dictationWords = updatedDictationWords;

        updateDraft(draftObject)

    }
    // const addWordInput = () => {

    //     singledraft.dictationWords.words.push( <input
    //         type="text"
    //         defaultValue={" "}
    //         name="word"
    //         placeholder="הכנס מילה חדשה"
    //     />);
    //   };


    if (isLoading || isClassesLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const singledraft = draftsObject.data.find(draft => draft._id === draftId)
    if (!singledraft) return <h1>{"Not found"}</h1>
    return (
        <div className="single-draft-container">
            <div className="single-draft-form-container">
                <form onSubmit={formSubmit} className="single-draft-form">
                    <input name="_id" defaultValue={singledraft._id} type="hidden" />
                    <label>שם ההכתבה</label>
                    <input
                        defaultValue={singledraft.name}
                        type="text"
                        name="name"
                        placeholder="הכנס שם הכתבה"
                    />
                    <label>כיתה</label>
                    <select name="classId" id="classId" required>
                        {classes.data.map(oneClass => {
                            return <option selected={oneClass._id === singledraft.class?._id} value={oneClass._id}>{oneClass.school + " " + oneClass.grade + " " + oneClass.gradeNumber + " " + oneClass.schoolYear}</option>

                        })}
                    </select>
                    <table className="draft-word-dictation-list-table">
                        <thead>
                            <tr>
                                <td>מילה</td>
                                <td>פרושים</td>
                            </tr>
                        </thead>
                        <tbody> {singledraft.dictationWords?.map((obj, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={obj.word}
                                        name="word"
                                        placeholder="הכנס מילה חדשה"
                                    />
                                </td>

                                <td> <input
                                    type="text"
                                    defaultValue={obj.meanings ? obj.meanings.join(", ") : ""}
                                    name="meaning"
                                    placeholder="הכנס פרוש"
                                /></td>

                            </tr>
                        ))}

                            <button type="button" >הוסף מילה</button>
                        </tbody>
                    </table>

                    <button>עדכן</button>
                </form>
            </div>
        </div>
    )
}

export default SingleDraft