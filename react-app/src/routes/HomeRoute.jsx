
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../axios/api/friends/getFriends.req';
import { setFriends, setMessages } from '../redux-toolkit/reducers/user';
import _ from 'lodash';
import { getMessages } from '../axios/api/messages/getMessages.req';
import UserHeader from '../chat/UserHeader'
import SearchBar from '../chat/SearchBar'
import "../homeroute.css"
import SideChatWindow from '../chat/SideChatWindow'
import FriendHeader from '../chat/FriendHearder'
import MainChatWindow from '../chat/MainChatWindow'
import TextBar from '../chat/TextBar'


function HomeRoute() {
  const { profile, friends, messages } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    const res = await getFriends();
    console.log("Fetch Friends: ", res?.data);
    dispatch(setFriends(_.pick(res?.data, "-_id -email")));
  }

  const fetchMessages = async () => {
    const res = await getMessages();
    console.log("Fetch Messages: ", res?.data);
    dispatch(setMessages(_.pick(res?.data, "-_id -email")));
  }

  useEffect(() => {
    fetchFriends();
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='main-container'>
    <div className='left_side_container' >
      <UserHeader/>
      <SearchBar/>
      <SideChatWindow/>
      </div>
      <div className='right_side_container'>
      <FriendHeader/>
      <MainChatWindow/>
      <TextBar/>
      </div>
    </div>
  )
}

export default HomeRoute