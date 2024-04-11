import "./single-user.css"

const SingleUser = () => {
    const user = { _id: 1, username: "12345678", name: "טלי", class: { school: "מכלול", grade: "יג", gradeNumber: 6 }, roles: 'Student', active: true }
    const classes = [
        { _id: 1, school: "מכלול", grade: "יג", gradeNumber: 6, schoolYear: 2023 }
    ]
    return (
        <div className="single-user-container">
            <div className="single-user-info">
                <div className="single-user-img-container">
                    <img src={user.image || "/noavatar.png"} />
                </div>
                {user.name}
            </div>
            <div className="single-user-form-container">
                <form  className="single-user-form">
                    <input name="_id" defaultValue={user._id} type="hidden" />
                    <label>שם משתמש</label>
                    <input readOnly={true} type="text" name="username" defaultValue={user.username} />
                    <label>סיסמא</label>
                    <input type="password" name="password" />
                    <label>שם מלא</label>
                    <input type="text" name="name" placeholder="שם מלא" defaultValue={user.name} />
                    <label>כיתה</label>
                    <select name="class" id="class" required>
                        {classes.map(oneClass => {
                            return <option value={oneClass._id}>{oneClass.school + " " + oneClass.grade + " " + oneClass.gradeNumber}</option>
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
                    <button>עדכן</button>
                </form>
            </div>
        </div>
    )
}

export default SingleUser