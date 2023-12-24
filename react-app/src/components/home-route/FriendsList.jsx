import React from 'react'
import defaultPic from './../../assets/images/defaultPic.png';
import { FaChevronDown } from "react-icons/fa";
import { fromateTime } from './../../utils/formators';
import { NewChatIcon } from './../../assets/svgs/'
import "./FriendsList.css"

const FriendListTile = ({ friend, onClick }) => {
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
          {
            friend?.unreadMessages > 0 &&
            <span className='unread_count'>{friend?.unreadMessages}</span>
          }
          <FaChevronDown className='options_icon' />
        </div>
      </div>
    </div>
  )
}

function FriendsList({ friends, onSelectFriend }) {
  return (
    <div className="friend_list">
      {friends?.friends?.length > 0 ?
        friends.friends.map((friend, i) => (
          <FriendListTile key={i} friend={friend}
            onClick={() => onSelectFriend(friend)}
          />
        )) :
        <div className="no_friends">
          <h3>No friends yet</h3>
          <p>
            Click on
            <NewChatIcon className='icon' />
            to add friends and start chating
          </p>
        </div>
      }
    </div>
  )
}

export default FriendsList