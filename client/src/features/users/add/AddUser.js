import "./add-user.css"
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../usersApiSlice";
import {useGetAllClassesQuery} from "../../classes/classesApiSlice";
import { useEffect } from "react";

  
const AddUser = () => {
  const [addUser, {data, isError, error, isSuccess, isLoading}] = useAddUserMutation()
  const  {data: classesObject, isLoading: isClassesLoading} = useGetAllClassesQuery()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate("/dash/users")
    }

  }, [isSuccess])
  const formSubmit = (e) =>{
    e.preventDefault()
      const data = new FormData(e.target)
      const userObject =Object.fromEntries(data.entries())
      addUser(userObject)
      




  }
  if(isClassesLoading) return <h1> Loading ...</h1>
  return (
    <div className="add-user-container">
    <form onSubmit={formSubmit} className="add-user-form">
      <input type="text" placeholder="username" name="username" required />
      <input
        type="password"
        placeholder="password"
        name="password"
        required
      />
      <input type="text" placeholder="name" name="name" required />
      <select name="classId" id="classId" required>
        <option> בחר כיתה</option>
        {classesObject.data?.map(oneClass=>{
          return <option value={oneClass._id}>{oneClass.school+" "+ oneClass.grade+" "+oneClass.gradeNumber+" "+oneClass.schoolYear}</option>
        })}
      </select>
      <select name="roles" id="roles">
        <option value="Student">
          הרשאה
        </option>
        <option value="Teacher">מורה</option>
        <option value="Student">תלמידה</option>
      </select>
      <select name="active" id="active">
        <option value={true}>
          פעיל
        </option>
        <option value={true}>כן</option>
        <option value={false}>לא</option>
      </select>
      <input type="file"  name="userImg"/>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default AddUser