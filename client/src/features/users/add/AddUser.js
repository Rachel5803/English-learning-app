import "./add-user.css"
const classes=[
    {_id:1, school:"מכלול", grade:"יג", gradeNumber:6, schoolYear:2023}
  ]
  
const AddUser = () => {
  return (
    <div className="add-user-container">
    <form  className="add-user-form">
      <input type="text" placeholder="username" name="username" required />
      <input
        type="password"
        placeholder="password"
        name="password"
        required
      />
      <input type="text" placeholder="name" name="name" required />
      <select name="schhol" id="school" required>
        <option> בחר כיתה</option>
        {classes.map(oneClass=>{
          return <option value={oneClass._id}>{oneClass.school+" "+ oneClass.grade+" "+oneClass.gradeNumber}</option>
        })}
      </select>
      <select name="roles" id="roles">
        <option value="Studnt">
          הרשאה
        </option>
        <option value="Teacher">מורה</option>
        <option value="Student">תלמידה</option>
      </select>
      <select name="active" id="active">
        <option value={true}>
          פעיל
        </option>
        <option value={true}>כן</option>
        <option value={false}>לא</option>
      </select>
      <input type="file"  name="userImg"/>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default AddUser