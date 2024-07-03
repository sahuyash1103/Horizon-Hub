import React from "react";
import defaultPic from "./../../assets/images/defaultPic.png";
import { addFriend } from "./../../axios/api/friends/friendFeatures.req";
import PopupNewChat from "./../Popups";
import MenuOptions from "./MenuOptions";
import {
  CommunityIcon,
  StatusIcon,
  NewChatIcon,
  MoreVertIcon,
} from "./../../assets/svgs/";
import { FaUserSecret } from "react-icons/fa";
import "./LeftNavbar.css";

function LeftNavbar({ profile, updateFriendList, onClickProfile }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopupAnonymous, setShowPopupAnonymous] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);
  const newChatHandler = async (e, isAnonymous) => {
    e.preventDefault();
    if (email) {
      const res = await addFriend(email, null, { isAnonymous: isAnonymous });
      if (res?.data) updateFriendList(res?.data);
    }
    setShowPopup(false);
    setShowPopupAnonymous(false);
  };

  return (
    <div className="left_header">
      {showPopup && (
        <PopupNewChat
          setPopup={setShowPopup}
          email={email}
          setEmail={setEmail}
          onSubmit={newChatHandler}
        />
      )}
      {showPopupAnonymous && (
        <PopupNewChat
          setPopup={setShowPopupAnonymous}
          email={email}
          isAnonymous={true}
          setEmail={setEmail}
          onSubmit={newChatHandler}
        />
      )}
      <div className="Profile_pic" onClick={onClickProfile}>
        <img
          className="pic"
          src={profile?.profilePic || defaultPic}
          alt="user profile pic"
        />
      </div>
      <div className="nav_icons">
        <div className="icon_area">
          <CommunityIcon className="icon" />
        </div>
        <div className="icon_area">
          <StatusIcon className="icon" />
        </div>
        <div className="icon_area" onClick={() => setShowPopupAnonymous(true)}>
          <FaUserSecret className="icon react-icon" />
        </div>

        <div className="icon_area" onClick={() => setShowPopup(true)}>
          <NewChatIcon className="icon" />
        </div>
        <div className="icon_area" onClick={() => setShowMenu(!showMenu)}>
          <MoreVertIcon className="icon" />
          <MenuOptions showMenu={showMenu} />
        </div>
      </div>
    </div>
  );
}

export default LeftNavbar;
