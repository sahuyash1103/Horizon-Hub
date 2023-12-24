import React from 'react'
import { MdAdd } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdMic } from "react-icons/io";
import { sendTextMessage } from './../../socket';
import AttetchmentOptions from './AttetchmentOptions.jsx';
import "./MessageBox.css"

function MessageBox({ email, addAttachments }) {
  const [message, setMessage] = React.useState('')
  // const [showEmoji, setShowEmoji] = React.useState(false);
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
        <AttetchmentOptions showAdd={showAdd} addAttachments={addAttachments} onSelect={() => setShowAdd(false)} />
        <MdAdd className={`icon ${showAdd && 'clicked'}`} />
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
        <div className='mic_icon' >
          <IoMdMic className='icon' />
        </div>
      </div>
      <button type='submit' className='send_icon'>
        <IoSend className='icon' />
      </button>
    </form>
  )
}

export default MessageBox