import React from 'react'
import "./mainchatwindow.css"

function MainChatWindow() {
  return (


<div class="chat-container">
        <div class="message-box my-message">
          <p>Hey, are you done with UI?<br/><span>07:43 pm</span></p>
        </div>
        <div class="message-box friend-message">
          <p>Yeah, almost done.<br/><span>07:45 pm</span></p>
        </div>
        <div class="message-box friend-message">
          <p>I will message you shortly<br/><span>07:45 pm</span></p>
        </div>
        <div class="message-box my-message">
          <p>Sure.<br/><span>07:48 pm</span></p>
        </div>
      </div>
  )
}

export default MainChatWindow