import {NavLink} from "react-router-dom"

const MenuLink = ({item, onClick}) => {
  const handleMenuLinkClick = () => {
    if (item.title==="Tests") {
      onClick();
    }
  };
  
  return (
    <NavLink to={item.path} className="side-bar-menu-link" onClick={handleMenuLinkClick}>
    {item.icon}
    {item.title}
   </NavLink>
  )
}

export default MenuLink