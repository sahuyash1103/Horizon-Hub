import { fromateTime } from '../../../utils/formators';
import "./FriendMessage.css"

function FriendMessage({ message }) {
    return (
        <div className="friend_message">
            <p>
                {message?.text}
            </p>
            <span>{fromateTime(message?.sentOn)}</span>
        </div>
    )
}

export default FriendMessage