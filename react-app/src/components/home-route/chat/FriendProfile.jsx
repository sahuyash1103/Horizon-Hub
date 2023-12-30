import React from 'react'
import { RxCross2 } from "react-icons/rx";
import "./FriendProfile.css"

function FriendProfile({ show, onClose, friend }) {
  return (
    <div className={`friendprofile_container ${show && 'show'}`} onclick={onClose}>
      <div className={`friendprofile`}>
        <div className='profile'>
          <RxCross2 className='cross1' onClick={onClose} />
          Contact Info
        </div>
        <div className='profile_pic'>
          <img src={friend?.profilePic} alt="profile" />
        </div>
        <div className='friend_name'>
          <h3>{friend?.name}</h3>

          {friend?.phone && <p>+91 {friend?.phone}</p>}
          <p>{friend?.email}</p>
        </div>
        <div className='friend_about'>
          About
          <p>ChitChat is our Project.</p>
        </div>
      </div>
    </div>
  )
}

export default FriendProfile