import React from 'react'
import { fromateTime } from '../../utils/formators';
import { useSelector } from 'react-redux';
import "./MainChatWindow.css"


const FriendMessage = ({ message }) => {
  return (
    <div className="message friend_message">
      <p>
        {message?.message}
      </p>
      <span>{fromateTime(message?.sentOn)}</span>
    </div>
  )
}

const UserMessage = ({ message }) => {
  return (
    <div className="message my_message">
      <p>
        {message?.message}
      </p>
      <span>{fromateTime(message?.sentOn)}</span>
    </div>
  )
}

function MainChatWindow({ friend, conversationId }) {
  const { messages } = useSelector(state => state.user);
  const messagesEndRef = React.createRef();
  const friendMessages = messages[conversationId];

  React.useEffect(() => {
    console.log(friendMessages)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [friendMessages, messagesEndRef]);
  return (
    <div className='chat_window'>
      <div className="chat_container">
        {friendMessages &&
          friendMessages.map((message, index) => {
            const isFriendMessage = message?.sentBy === friend?._id;
            return isFriendMessage ?
              <FriendMessage key={index} message={message} /> :
              <UserMessage key={index} message={message} />
          })
        }
        <div id="messages_end" ref={messagesEndRef}></div>
      </div>
    </div>
  )
}

export default MainChatWindow