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
  MdOutlinePersonOutline,
  MdExpandLess,
  MdExpandMore,
  MdDrafts ,
  MdOutlineMarkunread ,
  MdGrading,
  MdListAlt,
  MdOutlinePerson

} from "react-icons/md";
import "./sidebar.css";
import MenuLink from "./MenuLink";
import {useSendLogoutMutation} from "../../features/auth/authApiSlice"
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetFilePath from "../../hooks/useGetFilePath";
const SideBar = () => {
  const {username, name, grade, roles, image} = useAuth()
  const [showExtendendMenu, setShowExtendendMenu] = useState(false);
  const navigate = useNavigate()
  const [logout, {isSuccess}] =useSendLogoutMutation()
  const {getFilePath} = useGetFilePath()
  const handleDictationsClick = (e) => {
    
    // Toggle visibility of additional links
    setShowExtendendMenu(!showExtendendMenu);
    
  };
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
          title: "הכתבות",
          onClick:handleDictationsClick,
          icon: showExtendendMenu? <MdExpandLess/>: <MdExpandMore/>,
        },
     ... (showExtendendMenu
        ? [
            {
              title: "טיוטות", 
              path: "/dash/dictations/drafts", 
              icon: <MdDrafts />, 
            },
            {
              title: "נשלח", 
              path: "/dash/dictations/sent", 
              icon: <MdOutlineMarkunread  />, 
            },
          ]
        : [])
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "פרופיל",
          path: "/dash/profile",
          icon: <MdOutlinePerson />
          ,
        }
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
          title: "הכתבות",
          path: "/dash/dictations",
          icon: <MdListAlt />,
        },
        {
          title: "ציונים",
          path: "/dash/dictations/complete",
          icon: <MdGrading />
          ,
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "פרופיל",
          path: "/dash/profile",
          icon: <MdOutlinePerson />
          ,
        }
      ],
    },
  ];
  
  const menuItems = roles==="Teacher"? teacherMenuItems: studentMenuItems
  const logoutClick = () =>{
      logout()
      navigate("/login")
  }

  return (
    <div className="side-bar">
      <div className="side-bar-user">
        <img
          src={ getFilePath(image)}
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

              <MenuLink item={item} key={item.title}  onClick={handleDictationsClick} />
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