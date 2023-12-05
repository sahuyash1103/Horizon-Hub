import React from 'react'
import defaultPic from '../../assets/images/defaultPic.png';
import { FaChevronDown } from "react-icons/fa";
import "./FriendsList.css"

const fromateTime = (time) => {
  const nowDate = new Date();
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  if (nowDate.getDate() === date.getDate()) {
    return `${hours}:${minutes} ${ampm}`;
  }
  if (nowDate.getDate() - 1 === date.getDate()) {
    return `Yesterday`;
  }
  if (nowDate.getFullYear() === date.getFullYear()) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  return `${hours}:${minutes} ${ampm}`;
}


const FriendListTile = ({ friend, unreadMessages }) => {
  const { name, profilePic } = friend?.friend;
  const { lastMessage } = friend;
  return (
    <div className="friend_tile">
      <div className="f_profile_pic">
        <img className="pic" src={profilePic || defaultPic} alt="friend profile pic" />
      </div>
      <div className="friend_details">
        <div className="main_heading">
          <h4>{name}</h4>
          <p className="time unread">{fromateTime(lastMessage?.sentOn)}</p>
        </div>
        <div className="sub_heading">
          <p>{friend?.lastMessageText || "No conversation yet"}</p>
          <span className='unread_count'>{unreadMessages}</span>
          <FaChevronDown className='options_icon' />
        </div>
      </div>
    </div>
  )
}

function FriendsList({ friends, unreadMessages }) {
  return (
    <div className="friend_list">
      {
        friends?.friends?.map((friend, i) => (
          <FriendListTile key={i} friend={friend} unreadMessages={unreadMessages} />
        ))
      }
    </div>
  )
}

export default FriendsList