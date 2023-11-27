import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../axios/api/friends/getFriends.req';
import { setFriends, setMessages } from '../redux-toolkit/reducers/user';
import _ from 'lodash';
import { getMessages } from '../axios/api/messages/getMessages.req';

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
    <div>
      <h3>{profile?.name}</h3>
      <h3>{profile?.email}</h3>
      <h3>{profile?.phone}</h3>
      <h3>{profile?.userName}</h3>
      <img src={profile?.profilePic} alt="profilePic" />
      <h3>{friends?.length}</h3>
      <h3>{messages?.length}</h3>
    </div>
  )
}

export default HomeRoute