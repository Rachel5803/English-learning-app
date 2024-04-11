import "./add-class.css"

const AddClass = () => {
    return (
        <div className="add-class-container">
            <form className="add-class-form">
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