import "./add-class.css"
import { useAddClassMutation } from "../classesApiSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const AddClass = () => {
    const navigate = useNavigate()
    const [addClass, { data, isError, error, isSuccess, isLoading }] = useAddClassMutation()
    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/classes")
        }
    }, [isSuccess])
    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const classObject = Object.fromEntries(data.entries())
        addClass(classObject)
    }
    return (
        <div className="add-class-container">
            <form onSubmit={formSubmit} className="add-class-form">
                <input type="text" required name="school" placeholder="school " />
                <input type="text" required name="grade" placeholder="class" />
                <input type="number" required name="gradeNumber" placeholder="class number " />
                <input type="text" required name="schoolYear" placeholder="school year " />
                <select name="active" id="active">
                    <option value={true}>
                        active
                    </option>
                    <option value={true}>yes</option>
                    <option value={false}>no</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddClass