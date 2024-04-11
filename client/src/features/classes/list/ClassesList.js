import "./classes-list.css"
import {Link} from "react-router-dom"
import Search from "../../../components/search/Search"
export const ClassesList = () => {
  const classes=[
    {_id:1, school:"מכלול", grade:"יג", gradeNumber:6, schoolYear:2023}
  ]
  return (
    <div className="classes-list">
      <div className="classes-list-top">
      <Search placeholder="חיפוש לפי שם כיתה" />
            <Link to="/dash/classes/add"  className="classes-list-add-button">
                הוספת כיתה
            </Link>
      </div>
      <table className="classes-list-table">
            <thead>
                <tr>
                    <td>בית הספר</td>
                     <td>כיתה </td>
                    <td>מספר כיתה </td>
                    <td>נוצר ב </td>
                    <td>שנת לימודים</td>
                </tr>
            </thead>
            <tbody>
                {classes.map(oneClass=>(
                    <tr key={oneClass._id}>
                      <td>
                            {oneClass.school}
                        </td>
                        <td>
                            {oneClass.grade}
                        </td>
                        <td>
                            {oneClass.gradeNumber}
                        </td>
                        <td>
                            {oneClass.createdAt?.toString().slice(4,16)}
                        </td>
                        <td>
                            {oneClass.schoolYear}
                        </td>
                        <td>
                            <div className="classes-list-buttons">

                           
                            <Link to={`/dash/classes/${oneClass._id}`} className="classes-list-button classes-list-view">
                                צפייה
                            </Link>
                            <button   className="classes-list-button classes-list-delete">
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
