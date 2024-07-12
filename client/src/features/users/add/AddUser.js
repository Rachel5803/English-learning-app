import "./add-user.css"
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../usersApiSlice";
import {useGetAllActiveClassesQuery} from "../../classes/classesApiSlice";
import { useEffect } from "react";

  
const AddUser = () => {
  const [addUser, {data, isError, error, isSuccess, isLoading}] = useAddUserMutation()
  const  {data: classesObject, isLoading: isClassesLoading} = useGetAllActiveClassesQuery()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate("/dash/users")
    }

  }, [isSuccess])
  useEffect(()=>{
    if(isError){
      window.alert(error.data.massage)
    }

  }, [isError])
  const formSubmit = (e) =>{
    e.preventDefault()
      const data = new FormData(e.target)
      addUser(data)
      




  }
  if(isClassesLoading) return <div className="error-page"> Loading ...</div>
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
        <option value=""> בחר כיתה</option>
        {classesObject?.data?.map(oneClass=>{
          return <option value={oneClass._id}>{oneClass.school+" "+ oneClass.grade+" "+oneClass.gradeNumber+" "+oneClass.schoolYear}</option>
        })}
      </select>
     
      <select name="active" id="active">
        <option value={true}>
          פעיל
        </option>
        <option value={true}>כן</option>
        <option value={false}>לא</option>
      </select>
      <input type="file"  name="image"/>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default AddUser