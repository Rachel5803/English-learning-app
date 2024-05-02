import "./login-page.css"
const LoginPage = () => {
  return (
    <div className="login-page">
        <form className="login-page-form">
            <h1>כניסת משתמשים</h1>
            <input type="text" required name="username" id="username" placeholder="שם משתמש" />
            <input type="password" required name="password" id="password" placeholder="סיסמא  " />
            <button type="submit"> כניסה</button>
        </form>
    </div>
  )
}

export default LoginPage