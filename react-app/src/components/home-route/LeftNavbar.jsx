import React from 'react'
import defaultPic from '../../assets/images/defaultPic.png';
import { CommunityIcon, StatusIcon, ChannelIcon, NewChatIcon, MoreVertIcon } from '../../assets/svgs/'
import "./LeftNavbar.css"

function LeftNavbar({ profile }) {
  return (
    <div className="left_header">
      <div className="Profile_pic">
        <img className="pic"
          src={profile?.profilePic || defaultPic} alt="user profile pic" />
      </div>
      <div className='nav_icons'>
        <div className='icon_area'>
          <CommunityIcon className='icon' />
        </div>
        <div className='icon_area'>
          <StatusIcon className='icon' />
        </div>
        <div className='icon_area'>
          <ChannelIcon className='icon' />
        </div>
        <div className='icon_area'>
          <NewChatIcon className='icon' />
        </div>
        <div className='icon_area'>
          <MoreVertIcon className='icon' />
        </div>
      </div>
    </div>
  )
}

export default LeftNavbar