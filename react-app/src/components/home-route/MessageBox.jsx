import React from 'react'
import { MdAdd } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import "./MessageBox.css"

function MessageBox() {
  return (
    <form class="message_box">
      <div className='add_icon'>
        <MdAdd className='icon' />
      </div>
      <div className='input'>
        <div className='emoji_icon' >
          <MdEmojiEmotions className='icon' />
        </div>
        <input type="text" placeholder="Type a message" />
      </div>
      <button type='submit' className='send_icon'>
        <IoSend className='icon' />
      </button>
    </form>
  )
}

export default MessageBox