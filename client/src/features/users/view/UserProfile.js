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


    if ( isUserLoading) return <div className="error-page"> Loading ...</div>
    if (isError) return <div className="error-page">{JSON.stringify(error)}</div>
    const user = userObject? userObject.data:""
    if (!user) return <div className="error-page">{"Not found"}</div>

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
                    <input readOnly={true} type="text" name="username" defaultValue={user.username} />
                  <label>  empty password = no change</label>
                    <input type="password" name="password" />
                    <label>full name </label>
                    <input type="text" name="name" placeholder="full name " defaultValue={user.name} required/>
                    <input type="file"  name="image"/>
                    <label>premission</label>
                    <input readOnly={true} type="text" name="roles" defaultValue={user.roles==='Teacher'?'teacher':'student'} />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UserProfile