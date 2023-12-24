import { IoDocument } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import "./AttechmentMessage.css";

const MessageAttetchment = ({ message }) => {
    const handleDownload = () => {
        window.open(message.fileUrl, '_blank');
    }
    return (
        <>
            {
                message?.messageType === 'image' &&
                <div className='attechment_container'>
                    <img className='attechment_image' src={message.fileUrl} alt='message attetchment' />
                    <MdDownload className='image_download_icon' onClick={handleDownload} />
                </div>
            }
            {
                message?.messageType === 'video' &&
                <div className='attechment_video'></div>
            }
            {
                message?.messageType === 'audio' &&
                <div className='attechment_audio'></div>
            }
            {
                message?.messageType === 'doc' &&
                <div className='attechment_doc'>
                    <div className='doc_icon'>
                        <IoDocument className='icon' />
                    </div>
                    <div className='download_icon' onClick={handleDownload}>
                        <MdDownload className='icon' />
                    </div>
                </div>
            }
        </>
    )
}

export default MessageAttetchment