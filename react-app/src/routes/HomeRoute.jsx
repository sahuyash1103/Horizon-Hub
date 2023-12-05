import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../axios/api/friends/getFriends.req';
import { setFriends, setMessages } from '../redux-toolkit/reducers/user';
import { getMessages } from '../axios/api/messages/getMessages.req';
import LeftNavbar from '../components/home-route/LeftNavbar';
import SearchBar from '../components/home-route/SearchBar';
import FriendsList from '../components/home-route/FriendsList';
import RightNavbar from '../components/home-route/RightNavbar';
import MainChatWindow from '../components/home-route/MainChatWindow';
import MessageBox from '../components/home-route/MessageBox';
import "../styles/HomeRoute.css"


function HomeRoute() {
  const { profile, friends, messages } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    const res = await getFriends();
    dispatch(setFriends(res?.data));
  }

  const fetchMessages = async () => {
    const res = await getMessages();
    dispatch(setMessages(res?.data));
  }

  // useEffect(() => {
  //   console.log("Profile: ", profile);
  //   console.log("Friends: ", friends);
  //   console.log("Messages: ", messages);
  // }, [friends, profile, messages])

  useEffect(() => {
    fetchFriends();
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='main_container'>
      <div className="left_window">
        <LeftNavbar profile={profile} />
        <SearchBar />
        <FriendsList friends={friends} unreadMessages={messages?.unreadMessages?.length} />
      </div>
      <div className="right_window">
        <RightNavbar />
        <MainChatWindow />
        <MessageBox />
      </div>
    </div>
  )
}

export default HomeRoute