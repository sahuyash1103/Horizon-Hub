import React from 'react'
import "./AttachmentWindow.css"
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

function AttachmentWindow() {
  return (
    <div className='attachment'>
        <RxCross2 className='cross' />
        <div className='image'>
        </div>
        <div className='options'>
        <div className='image-options'>
          <img src="https://rukminim1.flixcart.com/image/850/1000/xif0q/poster/7/i/y/medium-anime-scenery-beautiful-nature-dreamworld-anime-aesthetic-original-imagkzhgf2yzma8v.jpeg?q=20" width={93} height={107} alt="" />
        </div>
        <div className='image-options'>
          <img src="https://i.pinimg.com/originals/ec/1a/bb/ec1abb011bb5d3ec21d1b21497955115.jpg" width={93} height={107} alt="" />
        </div>
        <div className='image-options'>
          <img src="https://images.unsplash.com/photo-1574035849412-4dcad8c1510a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwzR3lBZFotRjRWa3x8ZW58MHx8fHx8" width={93} height={107} alt="" />
        </div>
        <div className='image-options'>
        <FaPlus className='plus' />
        </div>
        </div>
    </div>
  )
}

export default AttachmentWindow