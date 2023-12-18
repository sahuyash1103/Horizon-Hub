import { fromateTime } from './../../../utils/formators';
import "./UserMessage.css"

const UserMessageAttetchment = ({ message }) => {
    return (
        <div className="attetchment">
            {
                message?.messageType === 'image' &&
                <img className='image' src={message.fileURL} alt='message attetchment' />
            }
            {
                message?.messageType === 'video' &&
                <div className='video'></div>
            }
            {
                message?.messageType === 'audio' &&
                <div className='audio'></div>
            }
            {
                message?.messageType === 'doc' &&
                <div className='doc'></div>
            }
        </div>
    )
}

function UserMessage({ message }) {
    return (
        <div className="user_message">
            {
                message?.messageType !== 'text' &&
                <UserMessageAttetchment message={message} />
            }
            <p>
                {message?.text}
            </p>
            <span>{fromateTime(message?.sentOn)}</span>
        </div>
    )
}

export default UserMessage