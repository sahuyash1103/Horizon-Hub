const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");

router.put("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const friend_data = req.body.friend_data;
    if (!friend_data) return res.status(400).send("No friend data provided.");

    const friend = await User.findOne({ email: friend_data.email }).select(["_id", "name", "email",]);
    if (!friend) return res.status(404).send("Friend not found.");

    const isFound = user.pinnedFriends.find(f => f.friend.toString() === friend._id.toString());
    if (!isFound)
        return res.status(400).send("Friend already unpinned.");

    const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            $pull: { pinnedFriends  : { "friend": friend._id } },
            $push: {
                "friends": isFound || {
                    friend: friend._id,
                    lastMessage: null,
                    lastMessageText: null
                }
            }
        },
        {
            new: true
        }
    ).select(["friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"]);


    res.status(200).json({
        data: updatedUser,
        message: "Friend unpinned successfully.",
        error: null,
    });
});

module.exports = router;