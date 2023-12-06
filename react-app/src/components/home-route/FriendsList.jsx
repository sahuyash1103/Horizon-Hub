import React from 'react'
import defaultPic from '../../assets/images/defaultPic.png';
import { FaChevronDown } from "react-icons/fa";
import "./FriendsList.css"
import { fromateTime } from '../../utils/formators';

const FriendListTile = ({ friend, unreadMessages, onClick }) => {
  const friendDetails = friend?.friend;
  const { lastMessage } = friend;
  return (
    <div className="friend_tile" onClick={onClick}>
      <div className="f_profile_pic">
        <img className="pic" src={friendDetails?.profilePic || defaultPic} alt="friend profile pic" />
      </div>
      <div className="friend_details">
        <div className="main_heading">
          <h4>{friendDetails?.name}</h4>
          <p className="time unread">{
            lastMessage?.sentOn &&
            fromateTime(lastMessage?.sentOn)
          }</p>
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

function FriendsList({ friends, unreadMessages, onSelectFriend }) {
  return (
    <div className="friend_list">
      {
        friends?.friends?.map((friend, i) => (
          <FriendListTile key={i} friend={friend} unreadMessages={unreadMessages}
            onClick={() => onSelectFriend(friend)}
          />
        ))
      }
    </div>
  )
}

export default FriendsList