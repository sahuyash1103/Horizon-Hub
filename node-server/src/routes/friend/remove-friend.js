const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");
const findFriendInUserSubCollection = require("./../../utils/find-friend-in-user");

router.delete("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const friend_data = req.body.friend_data;
    if (!friend_data) return res.status(400).send("No friend data provided.");

    const friend = await User.findOne({ email: friend_data.email });

    const firend = await findFriendInUserSubCollection(user, friend._id);
    if (!firend)
        return res.status(400).send("Already removed from friend list.");

    if (firend.collection === "blockedFriends")
        return res.status(400).send("Unblock the friend first.");

    const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            $pull: { [firend.collection]: { "friend": friend._id } },
        },
        {
            new: true
        }
    ).select(["friends", "blockedFriends", "mutedFriends", "pinnedFriends", "unknownFriends"]);

    res.status(200).json({
        data: updatedUser,
        message: "Friend removed successfully.",
        error: null,
    });
});

module.exports = router;