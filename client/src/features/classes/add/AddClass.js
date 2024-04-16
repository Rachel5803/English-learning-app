import "./add-class.css"
import { useAddClassMutation } from "../classesApiSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const AddClass = () => {
    const navigate = useNavigate()
    const [addClass, {data, isError, error, isSuccess, isLoading}] = useAddClassMutation()
    useEffect(()=>{
        if(isSuccess){
          navigate("/dash/classes")
        }
    }, [isSuccess])
    const formSubmit = (e) =>{
        e.preventDefault()
          const data = new FormData(e.target)
          const classObject =Object.fromEntries(data.entries())
          addClass(classObject)
        }
    return (
        <div className="add-class-container">
            <form  onSubmit={formSubmit} className="add-class-form">
                <input type="text" required name="school" placeholder="בית ספר" />
                <input type="text" required name="grade" placeholder="כיתה" />
                <input type="number" required name="gradeNumber" placeholder="מספר כיתה" />
                <input type="text" required name="schoolYear" placeholder="שנת לימודים" />
                <button  type="submit">שלח</button>
            </form>
        </div>
    )
}

export default AddClass