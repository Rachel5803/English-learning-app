import {useSelector} from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import { jwtDecode } from "jwt-decode";
const useAuth = ()=>{
    const token  = useSelector(selectToken)
    let isTeacher = false
    let isStudent = false
    if(token){
        const userDecoded = jwtDecode(token)
        const {_id, username, roles, name, grade, image} = userDecoded
        isTeacher = roles ==="Teacher"
        isStudent = roles ==="Student"
        return {_id, username, roles, name, grade,image, isTeacher, isStudent}

    }

    return {_id:"", username:'', isTeacher, isStudent, name:'', grade:"", roles:"", image:""}


}
export default useAuth