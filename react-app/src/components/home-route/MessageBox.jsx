import React from 'react'
import { MdAdd } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import "./MessageBox.css"
import { sendTextMessage } from '../../socket';

function MessageBox({ email }) {
  const [message, setMessage] = React.useState('')
  
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendTextMessage(message, email);
      setMessage('');
    }
  }
  return (
    <form className="message_box" onSubmit={sendMessageHandler}>
      <div className='add_icon'>
        <MdAdd className='icon' />
      </div>
      <div className='input'>
        <div className='emoji_icon' >
          <MdEmojiEmotions className='icon' />
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type='submit' className='send_icon'>
        <IoSend className='icon' />
      </button>
    </form>
  )
}

export default MessageBox