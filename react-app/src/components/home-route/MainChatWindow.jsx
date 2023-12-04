import React from 'react'
import "./MainChatWindow.css"


const FriendMessage = ({ message }) => {
  return (
    <div class="message friend_message">
      <p>
        Yeah, almost done.
      </p>
      <span>07:45 pm</span>
    </div>
  )
}

const UserMessage = ({ message }) => {
  return (
    <div className="message my_message">
      <p>
        Hey, are you done with UI?
      </p>
      <span>07:43</span>
    </div>
  )
}

function MainChatWindow() {
  return (
    <div className='chat_window'>
      <div className="chat_container">
        <UserMessage />
        <FriendMessage />
        <UserMessage />
        <FriendMessage />
        <UserMessage />
        <FriendMessage />
        <UserMessage />
        <FriendMessage />
      </div>
    </div>
  )
}

export default MainChatWindow