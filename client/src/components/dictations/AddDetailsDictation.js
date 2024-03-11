import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAddDictationMutation } from './dictationApiSlice';
//import AddWordsDictation from './AddWordsDictation';
const AddDetailsDictation = () => {
  const [addDictation, { isSuccess, data}] = useAddDictationMutation()
  const [idDictation, setIdDictation] = useState("")
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    school: "",
    grade: "",
    gradeNumber: ""
  })
  const submitForm = async (e) => {
    e.preventDefault()
    const response = await addDictation(values);
    setIdDictation(response.data);
    setValues({ name: "", school: "", grade: "", gradeNumber: "" })
    navigate(`/dictation/update/words/${response.data}`);
    
  }
  const changeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  // useEffect(() => {
  //   console.log(idDictation);
  // },[isSuccess, data])

  return (
    <div className="detailsDictation">
      <form onSubmit={submitForm}>
        <input placeholder="press name"
          onChange={changeInput}
          name="name"
          id="name"
          value={values.name} />
        <input placeholder="press school"
          onChange={changeInput}
          name="school"
          id="school"
          value={values.school} />
        <input placeholder="press grade"
          onChange={changeInput}
          name="grade"
          id="grade"
          value={values.grade} />
        <input placeholder="press grade number"
          onChange={changeInput}
          name="gradeNumber"
          id="gradeNumber"
          value={values.gradeNumber}
        />


        <button disabled={values.name === "" || values.school === "" || values.grade === "" || values.gradeNumber === ""} type="submit" className="btn_submit">save</button>
      </form>
    </div>
  )
}

export default AddDetailsDictation