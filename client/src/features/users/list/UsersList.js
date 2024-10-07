import "./users-list.css"
import { Link, useSearchParams } from 'react-router-dom';
import Search from "../../../components/search/Search";
import { useGetAllUsersQuery, useDeleteUserMutation } from '../usersApiSlice';
import { useGetAllClassesQuery } from "../../classes/classesApiSlice";
import { useState } from "react"
import useGetFilePath from "../../../hooks/useGetFilePath"
import moment from 'moment';
import { MdCheck, MdClose } from "react-icons/md";
const UsersList = () => {
  const [detailsClass, setDetailsClass] = useState({})
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation()
  const [searchParams] = useSearchParams()
   const q = searchParams.get("q")
   const {getFilePath} = useGetFilePath()
  const deleteClick = (user) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      deleteUser({ _id: user._id })
    }

  }
  if (isLoading) return  <div className="error-users-list"> Loading ...</div>
    
  if (isError) return <div className="error-users-list">
    <h1>{error.data.massage}</h1>
    <Link  to="/dash/users/add" className="users-list-add-button">
 New user
</Link></div>



  const filteredData = !q? [...usersObject.data] : usersObject.data.filter(user=> (user.class.school?.indexOf(q) > -1) || (user.name.indexOf(q) > -1))


  return (
    <div className="users-list">
      <div className="users-list-top">
        <Search placeholder="Search for student name" />
        <Link className="users-list-add-button" to="/dash/users/add"> New user</Link>
        </div>
      <table className="users-list-table">
        <thead>
          <tr>
            <td>name</td>
            <td>username </td>
            <td>school </td>
            <td>grade</td>
            <td>class</td>
            <td> created on</td>
            <td>permission</td>
            <td>active</td>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((user) => (
            <tr key={user.id}>
              <div className="users-list-user">
                <img
                  src={ getFilePath(user.image)}
                  alt=""
                  width={40}
                  height={40}
                  className="users-list-user-image" />
                
                <td>{user.name}</td>
              </div>
              <td>{user.username}</td>
              
              <td>{user.class?.school}</td>
              <td>{user.class?.grade}</td>
              <td>{user.class?.gradeNumber}</td>
              <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
              <td>{user.roles === "Teacher" ? "teacher" : "student"}</td>
              <td>{user.active ? (
                                <MdCheck />
                            ) : (
                                <MdClose />
                            )}</td>
              <td>
                <div className="users-list-buttons">
                  <Link className='users-list-button users-list-view' to={`/dash/users/${user._id}`}>
                  View user details
                  </Link>
                  <Link className='users-list-button users-list-view' to={`/dash/users/grades/${user._id}`}>
                  View grades
                  </Link>

                  <button onClick={() => deleteClick(user)} className="users-list-button users-list-delete">
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default UsersList