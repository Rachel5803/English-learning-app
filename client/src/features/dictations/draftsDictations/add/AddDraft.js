import "./add-draft.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddDraftMutation } from "../draftsApiSlice";
import { useGetAllActiveClassesQuery } from "../../../classes/classesApiSlice";
import 'react-datepicker/dist/react-datepicker.css';
const AddDraft = () => {

    const [addDraft, { data, isError, error, isSuccess, isLoading }] = useAddDraftMutation()
    const { data: classesObject, isLoading: isClassesLoading } = useGetAllActiveClassesQuery()
    const [InputsArray, setInputsArray] = useState([""])

    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/dictations/drafts")
        }

    }, [isSuccess])
    const addNewWordInput = (index) => {
        if (index === InputsArray.length - 1) {
            setInputsArray([...InputsArray, ""])
        }

    }
   
    
    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const draftObject = Object.fromEntries(data.entries())
        const dictationWords = [];
        for (let i = 0; i < data.getAll('word').length; i++) {
            const word = data.getAll('word')[i].trim()
            const meanings = data.getAll('meaning')[i].split(",").map(meaning => meaning.trim())
            if (word != "" || meanings != "") {

                dictationWords.push({ word, meanings });
            }
        }
        draftObject.dictationWords = dictationWords;
        addDraft(draftObject)





    }
    if (isClassesLoading) return <h1> Loading ...</h1>
    return (
        <div className="add-draft-container">
            <form onSubmit={formSubmit} className="add-draft-form">
                <label> Enter test name </label>
                <input
                    type="text"
                    name="name"
                    
                    required
                />
<label>select class </label>
                <select name="classId" id="classId" required>
                
                    {classesObject?.data?.map(oneClass => {
                        return <option value={oneClass._id}>{oneClass.school + " " + oneClass.grade + " " + oneClass.gradeNumber + " " + oneClass.schoolYear}</option>
                    })}
                </select>
                <label>select submission data  </label>
                <input 
                type="date" 
                 name="endDate"
               
              
                />
               
                
               <label>  enter time limit in minutes </label>
                <input
                    type="number"
                    name="limitTime"
                    
                />
                <label>dictation words </label>
                {InputsArray?.map((item, index) => (
                    <span>
                        <input
                            type="text"
                            name="word"
                            placeholder="enter new word  "
                            onChange={() => addNewWordInput(index)}
                        />


                        <input
                            type="text"
                            name="meaning"
                            placeholder="enter translation "

                        />
                    </span>

                ))}




                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddDraft