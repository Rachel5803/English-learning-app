import React from 'react'
import { NavLink } from "react-router-dom"
import Link from '@mui/material/Link';
const Navigation = () => {
  return (
   

<div className="nav">
    
            <Link href= "/" className="link"  variant="body2" underline="none" > Home </Link>
            <Link href= "/personalArea" className="link" variant="body2" underline="none"> Personal area </Link>
            <Link href= "/dictation/create" className="link" variant="body2" underline="none"> Creata a dictation </Link>
            <Link href= "/StudentData" className="link" variant="body2" underline="none"> Student data </Link>
           </div>
  )
}

export default Navigation