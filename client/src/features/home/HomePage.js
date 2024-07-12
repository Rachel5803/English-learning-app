import "./homePage.css"
import { Link } from "react-router-dom"
import { MdContactMail} from "react-icons/md"

const HomePage = () => {
    return <div className="home-page-element">
        <article className="article">
            <h2 className="home-page-title2">English tests</h2><h2>learn English easy and fun</h2>
        </article>
        <div className="home-page-links">
        <Link className="home-page-link" to={"./login"}>login <img src="./noavatar.png" className="home-page-user-img"></img></Link>
        <a href="mailto:r3115803@gmail.com" className="home-page-link">contact<MdContactMail className="icon" /></a>
        </div>
        <div className="home-page-about-builder">
            <div> building : Rachel-Pfeffer   </div>
            <div>0533115803</div>
           </div>
    </div>

}
export default HomePage