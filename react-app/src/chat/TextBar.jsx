import React from 'react'
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import "./textbar.css"

function TextBar() {
  return (
    <div class="chatbox-input">
        <div className='text-icons'>
        <GrAttachment className='attachment' />
        </div>
        <div className='input'>
         
        <input type="text" placeholder="Type a message"/>
        <div className='emoji' >
        <MdEmojiEmotions className='emoji' />
        </div>
        </div>
        <div>
        <IoSend className='send' />
        </div>
      </div>
  )
}

export default TextBar