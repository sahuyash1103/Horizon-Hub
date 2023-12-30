import React from 'react'
import "./UserProfile.css"
import { FaPen } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

function UserProfile({ showProfile, profile, onClose }) {
  return (
    <div className={`userprofile ${showProfile && 'show'}`}>
      <div className='profile'>
        <FaArrowLeft className='arrow' onClick={onClose} />Profile</div>
      <div className='profile_pic'>
        <img src={profile?.profilePic} alt="profile" />
      </div>
      <div className='user_details'>
        Name
        <FaPen className='pen' />
        <p>{profile?.name}</p>
      </div>
      <div className='user_details'>
        About
        <FaPen className='pen' />
        <p>ChitChat is our Project.</p>
      </div>
      <div className='user_details'>
        Number
        <p>+91 {profile?.phone}</p>
      </div>
      <div className='user_details'>
        Email
        <p>{profile?.email}</p>
      </div>
    </div>
  )
}

export default UserProfile