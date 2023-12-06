const router = require("express").Router();
const User = require("../../mongo/schema/userSchema");
const auth = require("../../middlewares/auth.middleware");

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .select(["_id", "email", "friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"])
        .populate(
            "friends.friend blockedFriends.friend mutedFriends.friend pinnedFriends.friend unknownFriends.friend friends.lastMessage blockedFriends.lastMessage mutedFriends.lastMessage pinnedFriends.lastMessage unknownFriends.lastMessage",
            "name email phone profilePic isOnline lastSeen isDeleted isSuspended isLocked status message sentOn sentBy sentTo messageType isRead"
        );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
        data: user,
        error: null,
    });
});

router.get("/friend/:email", auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .select(["_id", "email", "friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"])
    if (!user) return res.status(404).json({ error: "User not found" });

    const friendEmail = req.params.email;
    if (!friendEmail) return res.status(404)({ error: "Friend data not provided" });

    const friend = await User.findOne({ email: friendEmail }).select(["_id", "name", "email", "phone", "profilePic", "isOnline", "lastSeen", "isDeleted", "isSuspended", "isLocked", "status"]);
    if (!friend) return res.status(404).json({ error: `${friendEmail} not found` });

    const isFound = user.friends.find((f) => f.friend.toString() === friend._id.toString());
    if (!isFound) return res.status(404).json({ error: `${friendEmail} not in your friend list` });

    res.status(200).json({
        data: friend,
        error: null,
    });
});

module.exports = router;