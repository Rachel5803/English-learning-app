import "./classes-list.css"
import { Link, useSearchParams } from "react-router-dom"
import Search from "../../../components/search/Search"
import { useGetAllClassesQuery, useDeleteClassMutation } from "../classesApiSlice"
import moment from 'moment';
import { MdCheck, MdClose } from "react-icons/md";
export const ClassesList = () => {
    const { data: classesObject, isError, error, isLoading, isSuccess } = useGetAllClassesQuery()
    const [deleteClass, { isSuccess: isDeleteSuccess }] = useDeleteClassMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const deleteClick = (singleClass) => {
        if (window.confirm("Are you sure you want to delete the class? ")) {
            deleteClass({ _id: singleClass._id })
        }

    }
    if (isLoading) return  <h1> Loading... </h1>
    
    if (isError) return <div className="error-classes-list"><h1>{error.data.massage}</h1><Link to="/dash/classes/add" className="classes-list-add-button ">
    Add class
</Link></div>
    const filteredData = !q ? [...classesObject.data] : classesObject.data.filter(singleClass => singleClass.school.indexOf(q) > -1)
    return (
        <div className="classes-list">
            <div className="classes-list-top">
                <Search placeholder="Search by school name" />
                <Link to="/dash/classes/add" className="classes-list-add-button">
                    Add class
                </Link>
            </div>
            <table className="classes-list-table">
                <thead>
                    <tr>
                        <td>school </td>
                        <td>grade </td>
                        <td>class</td>
                        <td>school year </td>
                        <td>active</td>
                        <td> created on </td>

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
                                {oneClass.active ? (
                                <MdCheck />
                            ) : (
                                <MdClose />
                            )}
                            </td>
                            
                            <td>
                                <td>{moment(oneClass.createdAt).format('DD/MM/YYYY')}</td>
                            </td>

                            <td>
                                <div className="classes-list-buttons">


                                    <Link to={`/dash/classes/${oneClass._id}`} className="classes-list-button classes-list-view">
                                        View
                                    </Link>
                                    <button onClick={() => { deleteClick(oneClass) }} className="classes-list-button classes-list-delete">
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
