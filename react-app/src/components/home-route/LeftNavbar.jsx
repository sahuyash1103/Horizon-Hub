import React from 'react'
import defaultPic from '../../assets/images/defaultPic.png';
import { CommunityIcon, StatusIcon, ChannelIcon, NewChatIcon, MoreVertIcon } from '../../assets/svgs/'
import "./LeftNavbar.css"
import { addFriend } from '../../axios/api/friends/friendFeatures.req';
import PopupNewChat from '../Popups';

function LeftNavbar({ profile, updateFriendList }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const newChatHandler = async (e) => {
    e.preventDefault();
    if (email) {
      const res = await addFriend(email);
      if (res?.data)
        updateFriendList(res?.data);
    }
    setShowPopup(false);
  }

  return (
    <div className="left_header">
      {
        showPopup &&
        <PopupNewChat
          setPopup={setShowPopup}
          email={email}
          setEmail={setEmail}
          onSubmit={newChatHandler}
        />
      }
      <div className="Profile_pic">
        <img className="pic"
          src={profile?.profilePic || defaultPic} alt="user profile pic" />
      </div>
      <div className='nav_icons'>
        <div className='icon_area'>
          <CommunityIcon className='icon' />
        </div>
        <div className='icon_area'>
          <StatusIcon className='icon' />
        </div>
        <div className='icon_area'>
          <ChannelIcon className='icon' />
        </div>

        <div className='icon_area' onClick={() => setShowPopup(true)}>
          <NewChatIcon className='icon' />
        </div>
        <div className='icon_area'>
          <MoreVertIcon className='icon' />
        </div>
      </div>
    </div >
  )
}

export default LeftNavbar