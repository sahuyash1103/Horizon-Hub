import React, { useEffect } from 'react'
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
import _ from 'lodash';
import "../styles/HomeRoute.css"

const orderMessagesByDate = (messages) => {
  const sortedMessages = _.orderBy(messages, 'message.sentOn', ['asc']);
  return sortedMessages;
}

function HomeRoute() {
  const { profile, friends, messages } = useSelector(state => state.user);
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    const res = await getFriends();
    dispatch(setFriends(res?.data));
  }

  const onSelectFriendHandler = async (friend) => {
    setSelectedFriend(friend);
    const res = await getMessagesOf(friend?.email);
    if (res?.data?.messages) {
      const sortedMessages = orderMessagesByDate(res?.data?.messages);
      dispatch(setMessages({ ...messages, [friend?.email]: sortedMessages }));
    }
  }

  // useEffect(() => {
  //   console.log("Profile: ", profile);
  //   console.log("Friends: ", friends);
  //   console.log("Messages: ", messages);
  // }, [friends, profile, messages])

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='main_container'>
      <div className="left_window">
        <LeftNavbar profile={profile} />
        <SearchBar />
        <FriendsList friends={friends} unreadMessages={"1"} onSelectFriend={onSelectFriendHandler} />
      </div>
      <div className="right_window">
        {selectedFriend ?
          <>
            <RightNavbar friend={selectedFriend} />
            <MainChatWindow friend={selectedFriend} />
            <MessageBox />
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