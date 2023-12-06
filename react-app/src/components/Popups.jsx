import React from 'react'
import { MdCancel } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import "./Popups.css"

function PopupNewChat({ setPopup, setEmail, email, onSubmit }) {
    return (
        <div className='popup_new_chat'>
            <div className='popup_new_chat_content'>
                <div className='popup_new_chat_header'>
                    <p></p>
                    <h2>New Chat</h2>
                    <p onClick={() => setPopup(false)}>
                        <MdCancel className="icons" />
                    </p>
                </div>
                <div className='popup_new_chat_body'>
                    <form onSubmit={onSubmit}>
                        <div className="text_field">
                            <input
                                value={email}
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your Email'
                            />
                            <span className="success_line"></span>
                            <span className="error_message" error-message="Invalid Email">
                            </span>
                            <IoMail className="icon" />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupNewChat