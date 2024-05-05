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
import useAuth from "../../hooks/useAuth";
const SideBar = () => {
  const {username, name, grade, roles, image} = useAuth()
  console.log(grade);
  const navigate = useNavigate()
  const [logout, {isSuccess}] =useSendLogoutMutation()
  const teacherMenuItems = [
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
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "כיתות",
          path: "/dash/classes",
          icon: <MdOutlineBusinessCenter />,
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
  const studentMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "ראשי",
          path: "/dash",
          icon: <MdDashboard />,
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
  
  const menuItems = roles==="Teacher"? teacherMenuItems: studentMenuItems
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
          src={image || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
          className="side-bar-user-image"
        />
        <div className="side-bar-user-details">
          <span className="side-car-user-name">{name}</span>
          <span className="side-car-user-title">{grade?.school}</span>
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