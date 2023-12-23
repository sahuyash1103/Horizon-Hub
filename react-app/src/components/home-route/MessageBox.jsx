import React from 'react'
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { sendTextMessage } from './../../socket';
import AttetchmentOptions from './AttetchmentOptions.jsx';
import "./MessageBox.css"

function MessageBox({ email, onAddAttachments }) {
  const [message, setMessage] = React.useState('')
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendTextMessage(message, email);
      setMessage('');
    }
  }
  return (
    <form className="message_box" onSubmit={sendMessageHandler}>
      <div className='add_icon' onClick={(e) => setShowAdd(!showAdd)}>
        <AttetchmentOptions showAdd={showAdd} onAddAttachments={onAddAttachments}/>
        {
          showAdd ?
            <RxCross2 className='icon' /> :
            <MdAdd className='icon' />
        }
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