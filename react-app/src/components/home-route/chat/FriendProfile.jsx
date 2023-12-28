import React from 'react'
import "./FriendProfile.css"
import { RxCross2 } from "react-icons/rx";

function FriendProfile() {
  return (
    <div className='friendprofile'>
        <div className='profile'> <RxCross2 className='cross1'/>
        Contact Info
        </div>
        <div className='profile_pic'></div>
        <div className='friend_name'>
        <h3>Ahmad</h3>
        <p>+91 8889991111</p>
        </div>
        <div className='friend_about'>
            About
             <p>ChitChat is our Project.</p>
             </div> 
    </div>
  )
}

export default FriendProfile