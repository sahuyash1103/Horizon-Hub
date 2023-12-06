const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");
const findFriendInUserSubCollection = require("./../../utils/find-friend-in-user");
const { v4: uuidv4 } = require('uuid');

router.put("/", auth, async (req, res) => {
    let friend;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found.");

    const friend_data = req.body.friend_data;
    if (!friend_data) return res.status(400).send("No friend data provided.");

    if (friend_data.userName) {
        friend = await User.findOne({ userName: friend_data.userName }).select(["_id", "name", "email",]);
        if (!friend) return res.status(404).send("Friend not found.");
    };

    if (!friend_data.email) return res.status(400).send("No friend email or userName provided.");

    if (!friend) {
        friend = await User.findOne({ email: friend_data.email }).select(["_id", "name", "email",]);
        if (!friend) return res.status(404).send("Friend not found.");
    }

    const isFound = await findFriendInUserSubCollection(user, friend._id);
    if (isFound) return res.status(400).send(`Friend is already (in) ${isFound.subMessage}.`);

    const conversationId = uuidv4();

    const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            $push: {
                friends: { friend: friend._id, lastMessage: null, lastMessageText: null, conversationId: conversationId }
            }
        },
        { new: true })
        .select(["_id", "email", "friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"])
        .populate(
            "friends.friend blockedFriends.friend mutedFriends.friend pinnedFriends.friend unknownFriends.friend friends.lastMessage blockedFriends.lastMessage mutedFriends.lastMessage pinnedFriends.lastMessage unknownFriends.lastMessage",
            "name email phone profilePic isOnline lastSeen isDeleted isSuspended isLocked status message sentOn sentBy sentTo messageType isRead"
        );;

    await User.findByIdAndUpdate(friend._id,
        {
            $push: {
                friends: { friend: user._id, conversationId: conversationId }
            }
        }
    );

    res.status(200).json({
        data: { friends: updatedUser.friends },
        message: "Friend added successfully.",
        error: null,
    });
});

module.exports = router;