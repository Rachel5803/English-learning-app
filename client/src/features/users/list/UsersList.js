import "./users-list.css"
import { Link } from 'react-router-dom';
import Search from "../../../components/search/Search";
const UsersList = () => {
    const users=[
        {_id:1,username:"12345678",name:"טלי",class:{school:"מכלול", grade:"יג", gradeNumber:6},roles:'Student', active:true }
      ]
  return (
    <div className="users-list">
    <div className="users-list-top">
      <Search placeholder="Search for a user..." />
      <Link className="users-list-add-button" to="/dash/users/add">משתמש חדש</Link>
        
     
    </div>
    <table className="users-list-table">
      <thead>
        <tr>
          <td>שם</td>
          <td>שם משתמש</td>
          <td>בית ספר</td>
          <td>כיתה</td>
          <td>מספר כיתה</td>
          <td>נוצר ב</td>
          <td>הרשאה</td>
          <td>פעיל</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <div className="users-list-user">
                                <img 
                                src={user.image || "/noavatar.png"}
                                alt=""
                                width={40}
                                height={40}
                                className="users-list-user-image" />
                                {user.name}
                            </div>
            <td>{user.username}</td>
            <td>{user.class?.school}</td>
            <td>{user.class?.grade}</td>
            <td>{user.class?.gradeNumber}</td>
            <td>{user.createdAt?.toString().slice(4, 16)}</td>
            <td>{user.roles==="Teacher" ? "מורה" : "תלמידה"}</td>
            <td>{user.active ? "כן" : "לא"}</td>
            <td>
              <div className="users-list-buttons">
                <Link className='users-list-button users-list-view' to={`/dash/users/${user._id}`}>
                    צפייה
                </Link>
             
                  <button className="users-list-button users-list-delete">
                    מחיקה
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