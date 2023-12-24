import { fromateTime } from './../../../utils/formators';
import MessageAttetchment from './AttechmentMessage';
import "./FriendMessage.css"

function FriendMessage({ message }) {
    return (
        <div className="friend_message">
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

export default FriendMessage