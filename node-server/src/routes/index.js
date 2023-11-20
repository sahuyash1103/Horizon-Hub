const loginRouter = require("./auth/login");
const signupRouter = require("./auth/signup");
const googleAuthRouter = require("./auth/google-auth");
const githubAuthRouter = require("./auth/github-auth");
const logoutRouter = require("./auth/logout");

const getFriendsRouter = require("./friend/get-friends");
const addFriendRouter = require("./friend/add-friend");
const blockFriendRouter = require("./friend/block-friend");
const muteFriendRouter = require("./friend/mute-friend");
const pinFriendRouter = require("./friend/pin-friend");
const unblockFriendRouter = require("./friend/unblock-friend");
const unmuteFriendRouter = require("./friend/unmute-friend");
const unpinFriendRouter = require("./friend/unpin-friend");
const removeFriendRouter = require("./friend/remove-friend");

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

    getFriendsRouter,
    addFriendRouter,
    blockFriendRouter,
    muteFriendRouter,
    pinFriendRouter,
    unblockFriendRouter,
    unmuteFriendRouter,
    unpinFriendRouter,
    removeFriendRouter,

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