import React from 'react'
import defaultPic from '../../assets/images/defaultPic.png';
import { FaChevronDown } from "react-icons/fa";
import "./FriendsList.css"


const FriendListTile = () => {
  return (
    <div class="friend_tile">
      <div class="f_profile_pic">
        <img class="pic" src={defaultPic} alt="friend profile pic" />
      </div>
      <div className="friend_details">
        <div className="main_heading">
          <h4>Yash</h4>
          <p class="time unread">11:49 pm</p>
        </div>
        <div className="sub_heading">
          <p>“How are you?”</p>
          <span className='unread_count'>1</span>
          <FaChevronDown className='options_icon' />
        </div>
      </div>
    </div>
  )
}

function FriendsList({ friends }) {
  return (
    <div class="friend_list">
      {

      }
      {
        [...Array(20)].map((e, i) => <FriendListTile key={i} />)
      }
    </div>
  )
}

export default FriendsList