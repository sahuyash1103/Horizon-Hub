import React from 'react'
import { useSelector } from 'react-redux'
import "./MainChatWindow.css"
import { fromateTime } from '../../utils/formators';


const FriendMessage = ({ message }) => {
  const messageDetails = message?.message;
  return (
    <div className="message friend_message">
      <p>
        {messageDetails?.message}
      </p>
      <span>{fromateTime(messageDetails?.sentOn)}</span>
    </div>
  )
}

const UserMessage = ({ message }) => {
  const messageDetails = message?.message;
  return (
    <div className="message my_message">
      <p>
        {messageDetails?.message}
      </p>
      <span>{fromateTime(messageDetails?.sentOn)}</span>
    </div>
  )
}

function MainChatWindow({ friend }) {
  const { messages } = useSelector(state => state.user);
  const friendMessage = messages[friend?.email];
  return (
    <div className='chat_window'>
      <div className="chat_container">
        {
          friendMessage?.map((message, index) => {
            if (message?.sentBy === friend?._id) {
              return <FriendMessage key={index} message={message} />
            }
            return <UserMessage key={index} message={message} />
          })
        }
      </div>
    </div>
  )
}

export default MainChatWindow