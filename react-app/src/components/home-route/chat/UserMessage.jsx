import { fromateTime } from './../../../utils/formators';
import MessageAttetchment from './../chat/AttechmentMessage';
import "./UserMessage.css"

function UserMessage({ message }) {
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
                <span>{fromateTime(message?.sentOn)}</span>
            </div>
        </div>
    )
}

export default UserMessage