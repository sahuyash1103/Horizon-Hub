import React, {Fragment} from 'react'
import { useSelector } from 'react-redux';
import FriendMessage from './chat/FriendMessage';
import UserMessage from './chat/UserMessage';
import { fromateDate } from './../../utils/formators';
import "./MainChatWindow.css"

function MainChatWindow({ friend, conversationId }) {
  const { messages } = useSelector(state => state.user);
  const messagesEndRef = React.createRef();
  const friendMessages = messages[conversationId];
  let lastMessageDate = null;

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [friendMessages, messagesEndRef]);

  return (
    <div className='chat_window'>
      <div className="chat_container">
        {friendMessages &&
          friendMessages.map((message, index) => {
            const isUserMessage = message?.sentBy !== friend?._id;
            const messageDate = new Date(message?.sentOn);
            const isDateChanged = lastMessageDate?.getDate() !== messageDate?.getDate();
            lastMessageDate = messageDate;

            return isDateChanged ?
              <Fragment key={index}>
                <div className="date_divider" key={messageDate}>
                  <span>{fromateDate(messageDate)}</span>
                </div>
                {
                  isUserMessage ?
                    <UserMessage key={message?._id} message={message} />
                    :
                    <FriendMessage key={message?._id} message={message} />
                }
              </Fragment>
              :
              <Fragment key={index}>
                {
                  isUserMessage ?
                    <UserMessage key={message?._id} message={message} />
                    :
                    <FriendMessage key={message?._id} message={message} />
                }
              </Fragment>
          })
        }
        <div id="messages_end" ref={messagesEndRef}></div>
      </div>
    </div>
  )
}

export default MainChatWindow