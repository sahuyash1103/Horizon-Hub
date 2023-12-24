import React, { useEffect, useRef } from 'react';
import { fromateTime } from './../../../utils/formators';
import MessageAttetchment from './AttechmentMessage';
import "./FriendMessage.css"
import useOnScreen from '../../../hooks/useOnScreen';
import { MarkSeenMessage } from '../../../axios/api/messages/messageSeen.req';

function FriendMessage({ message }) {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible && message.isRead === false) {
            MarkSeenMessage(message._id);
        }
    }, [isVisible, message])
    return (
        <div className="friend_message" ref={ref}>
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