import "./single-user.css"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllClassesQuery} from "../../classes/classesApiSlice";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../usersApiSlice";
import { useEffect } from "react";
import useGetFilePath from "../../../hooks/useGetFilePath";

const SingleUser = () => {
    const { userId } = useParams()
    const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
    const { data: classes, isLoading: isClassesLoading, isError:isClassesError, error:classesError } = useGetAllClassesQuery()
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
    if (isLoading || isClassesLoading) return <h1> Loading...</h1>
    if (isError || isClassesError) return <h1>{error.data.massage}</h1> 
    const user = usersObject.data.find(u => u._id === userId)
    if (!user) return <div className="error-page"> User not found</div>

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
                    <label>username </label>
                    <input readOnly={true} type="text" name="username" defaultValue={user.username}  />
                    <label> empty password = no change</label>
                    <input type="password" name="password" />
                    <label>full name </label>
                    <input type="text" name="name" placeholder="full name " defaultValue={user.name} required />
                    <label>class</label>
                    <select name="classId" id="classId" required>
                        {classes.data.map(oneClass => {
                            return <option selected={oneClass._id === user.class?._id} value={oneClass._id}>{oneClass.school + " " + oneClass.grade + " " + oneClass.gradeNumber+ " " + oneClass.schoolYear}</option>

                        })}
                    </select>
                    
                    
                    
                    <label>active?</label>
                    <select name="active" id="active">
                        <option value={true} selected={user.active}>yes</option>
                        <option value={false} selected={!user.active}>no</option>
                    </select>
                    <input type="file"  name="image"/>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleUser