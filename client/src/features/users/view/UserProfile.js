import "./single-user.css"
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useGetUserByIdMutation, useUpdateUserForUserMutation } from "../usersApiSlice";
import useGetFilePath from "../../../hooks/useGetFilePath";
import useAuth from "../../../hooks/useAuth";


const UserProfile = () => {
    const { _id } = useAuth()
    const [getUserById, {  data: userObject,  isLoading:isUserLoading, isError, error,isSuccess: isGetUserSuccess }] = useGetUserByIdMutation()
    const [updateProfile, { isSuccess: isUpdateSuccess,isLoading }] = useUpdateUserForUserMutation()
    const {getFilePath} = useGetFilePath()
    const navigate = useNavigate()
    useEffect(() => {
        if (_id) {
            console.log(_id);
            getUserById({_id})
            
        }
    }, [])
    useEffect(() => {
        if (isGetUserSuccess) {
            console.log(userObject);
            
        }
    }, [isGetUserSuccess])
    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/dash")
        }
    }, [isUpdateSuccess])
    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        updateProfile(data)

    }


    if ( isUserLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const user = userObject? userObject.data:""
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
                  <label>סיסמא ריקה = ללא שינוי</label>
                    <input type="password" name="password" />
                    <label>שם מלא</label>
                    <input type="text" name="name" placeholder="שם מלא" defaultValue={user.name} required/>
                    <input type="file"  name="image"/>
                    <label>סטטוס</label>
                    <input readOnly={true} type="text" name="roles" defaultValue={user.roles==='Teacher'?'מורה':'תלמידה'} />
                    <button>עדכן</button>
                </form>
            </div>
        </div>
    )
}

export default UserProfile