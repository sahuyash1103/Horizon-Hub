import React from 'react'
import { FaUsers } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { BiSolidMessageAdd } from "react-icons/bi";
import "./userheader.css"


function UserHeader() {
    return (
        <div class="header">
        <div class="user-img">
          <img class="dp" src="https://media.istockphoto.com/id/897479344/vector/avatar-profile-icon-male-faceless-user-on-colorful-round-background.jpg?s=170667a&w=0&k=20&c=opO4PECuzGzhoouxHfMfjVUUYbSkwJBgFinqtbOhJfk=" alt=""/>
        </div>
        <div className='nav-icons'>
        <div className='i'>
        <FaUsers className='react-icon' />
        </div>
        <div className='i'> 
        <BiSolidMessageAdd className='react-icon' />
        </div>
        <div className='i'>
        <CiMenuKebab className='react-icon' />
        </div>
        </div>
      </div>
    )
  }
  
  export default UserHeader