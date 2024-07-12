import { Outlet } from "react-router-dom"
import Footer from "../../footer/Footer"
import SideBar from "../../sidebar/SideBar"
import "./dash-layout.css"
const DashLayout = () => {
    return (
        <div className="container">
            <div className="menu">
              <SideBar/>
            </div>
            <div className="content">
               
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default DashLayout