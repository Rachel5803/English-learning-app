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

    if(isLoading) return <h1> Loading ...</h1>
  if(isError) return <h1>{ JSON.stringify( error)}</h1>
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
          />
          <label>כיתה</label>
          <input
            defaultValue={singleclass.grade}
            type="text"
            name="grade"
            placeholder="הכנס כיתה"
          />
          <label>מספר כיתה</label>
          <input
            defaultValue={singleclass.gradeNumber}
            type="number"
            name="gradeNumber"
            placeholder="הכנס מספר כיתה"
          />
          <label>שנת לימוד</label>
           <input
            defaultValue={singleclass.schoolYear}
            type="text"
            name="schoolYear"
            placeholder="הכנס שנת לימוד"
          />
          <button>עדכן</button>
            </form>
        </div>
    </div>
  )
}

export default SingleClass