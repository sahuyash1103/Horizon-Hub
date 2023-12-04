const loginRouter = require("./auth/login");
const signupRouter = require("./auth/signup");
const googleAuthRouter = require("./auth/google-auth");
const githubAuthRouter = require("./auth/github-auth");
const logoutRouter = require("./auth/logout");
const getTokenRouter = require("./auth/get-token");

const getFriendsRouter = require("./friend/get-friends");
const addFriendRouter = require("./friend/add-friend");
const blockFriendRouter = require("./friend/block-friend");
const muteFriendRouter = require("./friend/mute-friend");
const pinFriendRouter = require("./friend/pin-friend");
const unblockFriendRouter = require("./friend/unblock-friend");
const unmuteFriendRouter = require("./friend/unmute-friend");
const unpinFriendRouter = require("./friend/unpin-friend");
const removeFriendRouter = require("./friend/remove-friend");

const getGroupRouter = require("./group/get-group");
const createGroupRouter = require("./group/create-group");
const deleteGroupRouter = require("./group/delete-group");
const updateGroupRouter = require("./group/update-group");
const addMemberRouter = require("./group/add-members");
const removeMemberRouter = require("./group/remove-member");
const updateGroupProfilePicRouter = require("./group/update-profile-pic");
const changeAdminRouter = require("./group/change-admin");
const leaveGroupRouter = require("./group/leave-group.js");



const getMessagesRouter = require("./message/get-messages");
const seenMessageRouter = require("./message/message-seen");

const changePasswordRouter = require("./profile/change-password");
const forgotPasswordRouter = require("./profile/forgot-paasword");
const deleteProfileRouter = require("./profile/delete-profile");
const restoreProfileRouter = require("./profile/restore-profile");
const getProfileRouter = require("./profile/get-profile");
const setStatusRouter = require("./profile/set-status");
const updateProfileRouter = require("./profile/update-profile");
const updateProfilePicRouter = require("./profile/update-profile-pic");

module.exports = {
    loginRouter,
    signupRouter,
    googleAuthRouter,
    githubAuthRouter,
    logoutRouter,
    getTokenRouter,

    getFriendsRouter,
    addFriendRouter,
    blockFriendRouter,
    muteFriendRouter,
    pinFriendRouter,
    unblockFriendRouter,
    unmuteFriendRouter,
    unpinFriendRouter,
    removeFriendRouter,
    leaveGroupRouter,

    getGroupRouter,
    createGroupRouter,
    deleteGroupRouter,
    updateGroupRouter,
    addMemberRouter,
    removeMemberRouter,
    updateGroupProfilePicRouter,
    changeAdminRouter,

    getMessagesRouter,
    seenMessageRouter,

    changePasswordRouter,
    deleteProfileRouter,
    restoreProfileRouter,
    getProfileRouter,
    setStatusRouter,
    updateProfileRouter,
    updateProfilePicRouter,
    forgotPasswordRouter,
};