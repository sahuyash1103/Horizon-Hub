import React from 'react'
import { FaRegImage } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import { readFiles } from '../../utils/read-files';
import "./AttetchmentOptions.css"

function AttetchmentOptions({ showAdd, addAttachments, onSelect }) {

    const hendleOnselectFile = async (e, type) => {
        const files = await readFiles(e.target.files, type);
        addAttachments(files);
        onSelect();
    }

    return (
        <div className={`attetchment_options_container ${showAdd && 'active'}`}>
            <label className='attetchment_options'>
                <FaRegImage />
                Image
                <input className='file_input' multiple type="file" onChange={(e) => hendleOnselectFile(e, 'image')} accept='image/png, image/gif, image/jpeg' />
            </label>
            <label className='attetchment_options'>
                <MdAudiotrack />
                Audio
                <input className='file_input' multiple type="file" onChange={(e) => hendleOnselectFile(e, 'audio')} accept='audio/*' />
            </label>
            <label className='attetchment_options'>
                <RiVideoAddFill />
                Video
                <input className='file_input' multiple type="file" onChange={(e) => hendleOnselectFile(e, 'video')} accept='video/*' />
            </label>
            <label className='attetchment_options'>
                <IoIosDocument />
                Documnet
                <input className='file_input' multiple type="file" onChange={(e) => hendleOnselectFile(e, 'doc')} />
            </label>
        </div>
    )
}

export default AttetchmentOptions