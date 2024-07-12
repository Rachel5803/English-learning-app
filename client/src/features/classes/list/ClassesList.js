import "./classes-list.css"
import { Link, useSearchParams } from "react-router-dom"
import Search from "../../../components/search/Search"
import { useGetAllClassesQuery, useDeleteClassMutation } from "../classesApiSlice"
import moment from 'moment';
export const ClassesList = () => {
    const { data: classesObject, isError, error, isLoading, isSuccess } = useGetAllClassesQuery()
    const [deleteClass, { isSuccess: isDeleteSuccess }] = useDeleteClassMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const deleteClick = (singleClass) => {
        if (window.confirm("בטוח שברצונך למחוק את הכיתה")) {
            deleteClass({ _id: singleClass._id })
        }

    }
    if (isLoading) return  <h1> טוען נתונים</h1>
    
    if (isError) return <div className="error-classes-list"><h1>{error.data.massage}</h1><Link to="/dash/classes/add" className="classes-list-add-button ">
    הוספת כיתה
</Link></div>
    const filteredData = !q ? [...classesObject.data] : classesObject.data.filter(singleClass => singleClass.school.indexOf(q) > -1)
    return (
        <div className="classes-list">
            <div className="classes-list-top">
                <Search placeholder="חיפוש לפי שם סמינר" />
                <Link to="/dash/classes/add" className="classes-list-add-button">
                    הוספת כיתה
                </Link>
            </div>
            <table className="classes-list-table">
                <thead>
                    <tr>
                        <td>בית הספר</td>
                        <td>כיתה </td>
                        <td>מספר כיתה </td>
                        <td>שנת לימודים</td>
                        <td>פעיל</td>
                        <td>נוצר ב </td>

                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(oneClass => (
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
                                {oneClass.schoolYear}
                            </td>
                            <td>
                                {oneClass.active ? "כן" : "לא"}
                            </td>
                            <td>
                                <td>{moment(oneClass.createdAt).format('DD/MM/YYYY')}</td>
                            </td>

                            <td>
                                <div className="classes-list-buttons">


                                    <Link to={`/dash/classes/${oneClass._id}`} className="classes-list-button classes-list-view">
                                        צפייה
                                    </Link>
                                    <button onClick={() => { deleteClick(oneClass) }} className="classes-list-button classes-list-delete">
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
