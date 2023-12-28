import React from 'react'
import "./UserProfile.css"
import { FaPen } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

function UserProfile() {
  return (
    <div className='userprofile'>
        <div className='profile'> <FaArrowLeft className='arrow' />Profile</div>
        <div className='profile_pic'></div>
        <div className='user_details'>
            Name 
        <FaPen className='pen' />  
        <p>Sayma Ahmad</p>
        </div>
        <div className='user_details'>
            About
             <FaPen className='pen' />
             <p>ChitChat is our Project.</p>
             </div> 
        <div className='user_details'>
            Number
            <p>+91 9988556677</p>
            </div>
        <div className='user_details'>
            Email
            <p>User@gmail.com</p>
            </div> 
    </div>
  )
}

export default UserProfile