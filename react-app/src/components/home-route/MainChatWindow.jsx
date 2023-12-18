import React from 'react'
import { useSelector } from 'react-redux';
import FriendMessage from './chat/FriendMessage';
import UserMessage from './chat/UserMessage';
import "./MainChatWindow.css"

function MainChatWindow({ friend, conversationId }) {
  const { messages } = useSelector(state => state.user);
  const messagesEndRef = React.createRef();
  const friendMessages = messages[conversationId];

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [friendMessages, messagesEndRef]);
  
  return (
    <div className='chat_window'>
      <div className="chat_container">
        {friendMessages &&
          friendMessages.map((message, index) => {
            const isUserMessage = message?.sentBy !== friend?._id;
            return isUserMessage ?
              <UserMessage key={index} message={message} /> :
              <FriendMessage key={index} message={message} />
          })
        }
        <div id="messages_end" ref={messagesEndRef}></div>
      </div>
    </div>
  )
}

export default MainChatWindow