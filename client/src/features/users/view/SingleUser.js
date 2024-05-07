import "./single-user.css"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllClassesQuery } from "../../classes/classesApiSlice";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../usersApiSlice";
import { useEffect } from "react";
import useGetFilePath from "../../../hooks/useGetFilePath";

const SingleUser = () => {
    const { userId } = useParams()
    const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
    const { data: classes, isLoading: isClassesLoading } = useGetAllClassesQuery()
    const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation()
    const {getFilePath} = useGetFilePath()
    const navigate = useNavigate()
    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/dash/users")
        }
    }, [isUpdateSuccess])
    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        updateUser(data)

    }


    if (isLoading || isClassesLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const user = usersObject.data.find(u => u._id === userId)
    if (!user) return <h1>{"Not found"}</h1>

    return (
        <div className="single-user-container">
            <div className="single-user-info">
                <div className="single-user-img-container">
                    <img src={getFilePath(user.image)} />
                </div>
                {user.name}
            </div>
            <div className="single-user-form-container">
                <form onSubmit={formSubmit} className="single-user-form">
                    <input name="_id" defaultValue={user._id} type="hidden" />
                    <label>שם משתמש</label>
                    <input readOnly={true} type="text" name="username" defaultValue={user.username} />
                    <label>סיסמא</label>
                    <input type="password" name="password" />
                    <label>שם מלא</label>
                    <input type="text" name="name" placeholder="שם מלא" defaultValue={user.name} />
                    <label>כיתה</label>
                    <select name="classId" id="classId" required>
                        {classes.data.map(oneClass => {
                            return <option selected={oneClass._id === user.class?._id} value={oneClass._id}>{oneClass.school + " " + oneClass.grade + " " + oneClass.gradeNumber}</option>

                        })}
                    </select>
                    
                    
                    <label>הרשאה</label>
                    <select name="roles" id="roles">
                        <option value="Teacher" selected={user.roles === "Teacher"}>מורה</option>
                        <option value="Student" selected={user.roles === "Student"}>תלמידה</option>
                    </select>
                    <label>פעיל?</label>
                    <select name="active" id="active">
                        <option value={true} selected={user.active}>כן</option>
                        <option value={false} selected={!user.active}>לא</option>
                    </select>
                    <input type="file"  name="image"/>
                    <button>עדכן</button>
                </form>
            </div>
        </div>
    )
}

export default SingleUser