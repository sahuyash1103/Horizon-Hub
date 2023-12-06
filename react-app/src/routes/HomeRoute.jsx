import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../axios/api/friends/getFriends.req';
import { setFriends, setMessages } from '../redux-toolkit/reducers/user';
import { getMessagesOf } from '../axios/api/messages/getMessages.req';
import LeftNavbar from '../components/home-route/LeftNavbar';
import SearchBar from '../components/home-route/SearchBar';
import FriendsList from '../components/home-route/FriendsList';
import RightNavbar from '../components/home-route/RightNavbar';
import MainChatWindow from '../components/home-route/MainChatWindow';
import MessageBox from '../components/home-route/MessageBox';
import { connectSocket, initSocketListners, messageListner } from '../socket';
import _ from 'lodash';
import "../styles/HomeRoute.css"

const orderMessagesByDate = (messages) => {
  const sortedMessages = _.orderBy(messages, 'sentOn', ['asc']);
  return sortedMessages;
}

function HomeRoute() {
  const { profile, friends, messages } = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    const res = await getFriends();
    dispatch(setFriends(res?.data));
  }

  const onSelectFriendHandler = async (friend) => {
    const conversationID = friend?.conversationID;
    const friendDetails = friend?.friend;
    setSelectedFriend(friendDetails);
    setConversationId(conversationID);

    const res = await getMessagesOf(friendDetails?.email);
    if (res?.data?.messages) {
      const sortedMessages = orderMessagesByDate(_.map(res?.data?.messages, 'message')); 
      dispatch(setMessages({ ...messages, [conversationID]: sortedMessages }));
    }
  }

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    connectSocket(token);
    initSocketListners();
    messageListner(setNewMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (newMessage) {
      const message = newMessage?.message;
      const mconversationId = message.conversationID;
      const sortedMessages = orderMessagesByDate([...messages[mconversationId], message]);
      dispatch(setMessages({ ...messages, [mconversationId]: sortedMessages }));
      setNewMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  return (
    <div className='main_container'>
      <div className="left_window">
        <LeftNavbar profile={profile} />
        <SearchBar />
        <FriendsList
          friends={friends}
          unreadMessages={"1"}
          onSelectFriend={onSelectFriendHandler}
        />
      </div>
      <div className="right_window">
        {selectedFriend ?
          <>
            <RightNavbar friend={selectedFriend} />
            <MainChatWindow
              friend={selectedFriend}
              conversationId={conversationId}
            />
            <MessageBox email={selectedFriend?.email} />
          </>
          :
          <div className="no_chat_selected">
            <h1>Click on a friend to start chatting</h1>
            <p>sayma come up with an inovative design to fill this screen, please!</p>
          </div>
        }
      </div>
    </div>
  )
}

export default HomeRoute