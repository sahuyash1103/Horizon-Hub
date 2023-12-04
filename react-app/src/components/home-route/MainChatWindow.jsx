import React from 'react'
import "./MainChatWindow.css"
import "./MessageBox.css"


const FriendMessage = ({ message }) => {
  return (
    <div className="message friend_message">
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
        {
          [...Array(20)].map((_, i) =>
            <>
              <FriendMessage key={i + 40} />
              <UserMessage key={i + 60} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default MainChatWindow