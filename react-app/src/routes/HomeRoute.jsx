import React from 'react'
import UserHeader from '../chat/UserHeader'
import SearchBar from '../chat/SearchBar'
import "../homeroute.css"
import SideChatWindow from '../chat/SideChatWindow'
import FriendHeader from '../chat/FriendHearder'
import MainChatWindow from '../chat/MainChatWindow'
import TextBar from '../chat/TextBar'

function HomeRoute() {
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