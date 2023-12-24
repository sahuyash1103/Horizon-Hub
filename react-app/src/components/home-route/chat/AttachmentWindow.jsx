import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdMic } from "react-icons/io";
import { sendDocMessage, sendImageMessage } from '../../../socket';
import { readFiles } from '../../../utils/read-files';
import _ from 'lodash';
import "./AttachmentWindow.css"

function AttachmentPreviewWindow({ email, setAttachments, attachments }) {
  const [index, setIndex] = React.useState(0);
  const [messages, setMessages] = React.useState(attachments);


  const hendleOnAddFile = async (e) => {
    const files = await readFiles(e.target.files, 'doc');
    setAttachments([...files, ...attachments]);
  }

  const sendFileMessage = (e) => {
    e.preventDefault();
    messages.forEach((message, i) => {
      const text = message.text;
      const file = _.omit(message, ['text', 'url']);
      console.log(message);
      if (!file) return;
      if (message.type === 'image')
        sendImageMessage(email, text, file)
      else
        sendDocMessage(email, text, file)
    });

    setAttachments([]);
  }

  return (
    <div className='attachment_window'>
      <div className="attechment_options">
        <div className="more_icons">
          {/* more option icons */}
        </div>
        <div className="close_icon" onClick={() => setAttachments([])}>
          <RxCross2 className='icon' />
        </div>
      </div>
      <div className='preview_img'>
        <img src={attachments[index].url} alt="preview" />
      </div>
      <div className='attechment_caption_input'>
        <div className='emoji_icon' >
          <MdEmojiEmotions className='icon' />
        </div>
        <input
          type="text"
          placeholder="Add a caption"
          value={messages[index].text || ''}
          onChange={(e) => setMessages([...messages, messages[index].text = e.target.value])}
        />
        <div className='mic_icon' >
          <IoMdMic className='icon' />
        </div>
      </div>
      <div className='attechments_list'>
        {
          attachments.map((attachment, i) => (
            <div
              className={`attachment_img ${index === i && 'active'}`}
              key={i}
              onClick={() => setIndex(i)}
            >
              <img src={attachment.url} alt="attechment" />
            </div>
          ))
        }
        <label className='attachment_img_add'>
          <FaPlus className='add_more_files' />
          <input className='file_input' type="file" multiple onChange={hendleOnAddFile} />
        </label>
      </div>
      <span className='send_icon' onClick={sendFileMessage}>
        <IoSend className='icon' />
      </span>
    </div>
  )
}

export default AttachmentPreviewWindow