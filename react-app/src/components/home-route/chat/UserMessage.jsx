import { fromateTime } from './../../../utils/formators';
import MessageAttetchment from './../chat/AttechmentMessage';
import "./UserMessage.css"

function UserMessage({ message }) {
    let messageStatusClassName = `${message.isSent && 'sent'} ${message.isReceived && 'received'} ${message.isRead && 'read'}`;
    return (
        <div className="user_message">
            {
                message?.messageType !== 'text' &&
                <MessageAttetchment message={message} />
            }
            <div className="content">
                <p>
                    {message?.text}
                </p>
                <div className='message_status_container'>
                    <span className='message_time'>{fromateTime(message?.sentOn)}
                    </span>
                    <span id='message_status'
                        className={messageStatusClassName}>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserMessage