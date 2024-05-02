import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdOutlineDiversity3,
  MdPendingActions,
  MdOutlineSettings,
  MdHelpCenter,
  MdOutlineBusinessCenter,
  MdLogout,
  MdFace3,
  MdOutlinePersonOutline
} from "react-icons/md";
import "./sidebar.css";
import MenuLink from "./MenuLink";
import {useSendLogoutMutation} from "../../features/auth/authApiSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate()
  const [logout, {isSuccess}] =useSendLogoutMutation()
  const menuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "ראשי",
          path: "/dash",
          icon: <MdDashboard />,
        },
        {
          title: "משתמשים",
          path: "/dash/users",
          icon: <MdOutlinePersonOutline />,
        },
        {
          title: "כיתות",
          path: "/dash/classes",
          icon: <MdOutlineDiversity3 />,
        },
        {
          title: "פעולות",
          path: "/dash/actions",
          icon: <MdPendingActions />,
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "הגדרות",
          path: "/dash/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "עזרה",
          path: "/dash/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];

  const user = {
    username: "username",
    name: "טלי פפר",
    class: "כיתה יג",
    image: "",
  };
  useEffect(()=>{
    if(isSuccess){
      navigate("/login")
    }
  }, [isSuccess])
  const logoutClick = () =>{
      logout()
  }

  return (
    <div className="side-bar">
      <div className="side-bar-user">
        <img
          src={user.image || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
          className="side-bar-user-image"
        />
        <div className="side-bar-user-details">
          <span className="side-car-user-name">{user.name}</span>
          <span className="side-car-user-title">{user.class}</span>
        </div>
      </div>
      <ul className="side-bar-menu-list">
      {menuItems.map(cat=>(
          <li key={cat.title}>
            <span className="side-bar-menu-cat">{cat.title}</span>
            {cat.list.map(item=>(
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button onClick={logoutClick} className="side-bar-logout">
        <MdLogout />
        יציאה
      </button>

    </div>
  )
}

export default SideBar