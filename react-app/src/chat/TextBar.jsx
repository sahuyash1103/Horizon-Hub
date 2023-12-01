import React from 'react'
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import "./textbar.css"

function TextBar() {
  return (
    <div class="chatbox-input">
      <GrAttachment className='fa' />
      <input type="text" placeholder="Type a message" />
      <IoSend className='send' />
    </div>
  )
}

export default TextBar