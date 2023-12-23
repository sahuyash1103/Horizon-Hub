import React from 'react'
import { FaRegImage } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import "./AttetchmentOptions.css"

function AttetchmentOptions({ showAdd, onAddAttachments }) {
    const handleOnClick=()=>{
        onAddAttachments(true);
    }
    return (
        <div className={`attetchment_options_container ${showAdd && 'active'}`}>
            <div className='attetchment_options' onClick={handleOnClick}>

                <FaRegImage />
                Image
            </div>
            <div className='attetchment_options' onClick={handleOnClick}>
                <MdAudiotrack />
                Audio
            </div>
            <div className='attetchment_options' onClick={handleOnClick}>
                <RiVideoAddFill />
                Video
            </div>
            <div className='attetchment_options' onClick={handleOnClick}>
                <IoIosDocument />
                Documnet
            </div>
        </div>
    )
}

export default AttetchmentOptions