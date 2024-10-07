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
  if(isError) return <div className="error-page"><h1>{ JSON.stringify( error)}</h1></div>
  const singleclass = classObject.data.find(oneClass => oneClass._id === classId)
  if(!singleclass) return <h1>{ "Not found"}</h1>
    return (
    <div className="single-class-container">
        <div className="single-class-form-container">
            <form onSubmit={formSubmit} className="single-class-form">
            <input name="_id" defaultValue={singleclass._id} type="hidden" />
            <label> school name </label>
          <input
            defaultValue={singleclass.school}
            type="text"
            name="school"
            placeholder="Enter school name"
            required
          />
          <label>class</label>
          <input
            defaultValue={singleclass.grade}
            type="text"
            name="grade"
            placeholder="Enter class"
            required
          />
          <label>class number </label>
          <input
            defaultValue={singleclass.gradeNumber}
            type="number"
            name="gradeNumber"
            placeholder="Enter class number "
            required
          />
          <label>school year </label>
           <input
            defaultValue={singleclass.schoolYear}
            type="text"
            name="schoolYear"
            placeholder="Enter school year"
            required
          />
           <label>active?</label>
                    <select name="active" id="active">
                        <option value={true} selected={singleclass.active}>yes</option>
                        <option value={false} selected={!singleclass.active}>no</option>
                    </select>
          <button>Update</button>
            </form>
        </div>
    </div>
  )
}

export default SingleClass