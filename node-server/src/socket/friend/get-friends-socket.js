const { User } = require("../../../models/user");
const { Message } = require("../../../models/message");
const { Group } = require("../../../models/group");
const _ = require("lodash");

const getFriendsData = (socket, io) => {
    socket.on("get-friends", async (data) => {
        const user = await User.findById(socket.user._id).select(["_id", "friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"]).populate(["friends", "friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"], "name profilePic isOnline lastSeen status");

        if (!user) return socket.emit("get-friends", { error: "User not found" });

        socket.emit("get-friends", { data: user });
    });
}

module.exports = { getFriendsData };