import "./single-class.css"
import {useGetAllClassesQuery,useUpdateClassMutation} from "../classesApiSlice"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const SingleClass = () => {
  
    const {classId} = useParams()
    const  {data: classObject, isError, error, isLoading, isSuccess} = useGetAllClassesQuery()
    const [updateClass, {isSuccess: isUpdateSuccess}] = useUpdateClassMutation()
    const navigate = useNavigate()
  useEffect(()=>{
    if(isUpdateSuccess){
      navigate("/dash/classes")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) =>{
      e.preventDefault()
      const data = new FormData(e.target)
      const classObject =Object.fromEntries(data.entries())
      updateClass(classObject)

  } 

    if(isLoading) return <div className="error-page"> Loading ...</div>
  if(isError) return <div className="error-page">{ JSON.stringify( error)}</div>
  const singleclass = classObject.data.find(oneClass => oneClass._id === classId)
  if(!singleclass) return <h1>{ "Not found"}</h1>
    return (
    <div className="single-class-container">
        <div className="single-class-form-container">
            <form onSubmit={formSubmit} className="single-class-form">
            <input name="_id" defaultValue={singleclass._id} type="hidden" />
            <label>שם בית הספר</label>
          <input
            defaultValue={singleclass.school}
            type="text"
            name="school"
            placeholder="הכנס שם בית ספר"
            required
          />
          <label>כיתה</label>
          <input
            defaultValue={singleclass.grade}
            type="text"
            name="grade"
            placeholder="הכנס כיתה"
            required
          />
          <label>מספר כיתה</label>
          <input
            defaultValue={singleclass.gradeNumber}
            type="number"
            name="gradeNumber"
            placeholder="הכנס מספר כיתה"
            required
          />
          <label>שנת לימוד</label>
           <input
            defaultValue={singleclass.schoolYear}
            type="text"
            name="schoolYear"
            placeholder="הכנס שנת לימוד"
            required
          />
           <label>פעיל?</label>
                    <select name="active" id="active">
                        <option value={true} selected={singleclass.active}>כן</option>
                        <option value={false} selected={!singleclass.active}>לא</option>
                    </select>
          <button>עדכן</button>
            </form>
        </div>
    </div>
  )
}

export default SingleClass