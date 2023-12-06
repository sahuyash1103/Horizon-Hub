import { fromateTime } from './../../../utils/formators';
import "./UserMessage.css"

function UserMessage({ message }) {
    return (
        <div className="user_message">
            <p>
                {message?.text}
            </p>
            <span>{fromateTime(message?.sentOn)}</span>
        </div>
    )
}

export default UserMessage