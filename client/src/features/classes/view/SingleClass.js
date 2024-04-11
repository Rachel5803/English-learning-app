import "./single-class.css"

const SingleClass = () => {
    const singleclass={_id:1,school:"מכלול",grade:"יג", gradeNumber:6, schoolYear:"2023"}
  return (
    <div className="single-class-container">
        <div className="single-class-form-container">
            <form className="single-class-form">
            <input name="_id" defaultValue={singleclass._id} type="hidden" />
            <label>שם בית הספר</label>
          <input
            defaultValue={singleclass.school}
            type="text"
            name="school"
            placeholder="הכנס שם בית ספר"
          />
          <label>כיתה</label>
          <input
            defaultValue={singleclass.grade}
            type="text"
            name="grade"
            placeholder="הכנס כיתה"
          />
          <label>מספר כיתה</label>
          <input
            defaultValue={singleclass.gradeNumber}
            type="number"
            name="gradeNumber"
            placeholder="הכנס מספר כיתה"
          />
          <label>שנת לימוד</label>
           <input
            defaultValue={singleclass.schoolYear}
            type="text"
            name="schoolYear"
            placeholder="הכנס שנת לימוד"
          />
          <button>עדכן</button>
            </form>
        </div>
    </div>
  )
}

export default SingleClass