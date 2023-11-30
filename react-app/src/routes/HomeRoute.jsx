import React from 'react'
import UserHeader from '../chat/UserHeader'
import SearchBar from '../chat/SearchBar'
import SideChatWindow from '../chat/SideChatWindow'
import FriendHeader from '../chat/FriendHearder'
import MainChatWindow from '../chat/MainChatWindow'
import TextBar from '../chat/TextBar'

function HomeRoute() {
  return (
    <div className='main-container'>
    
      <UserHeader/>
        <SearchBar/>
      <SideChatWindow/>
      <FriendHeader/>
      <MainChatWindow/>
      <TextBar/>
    </div>
  )
}

export default HomeRoute