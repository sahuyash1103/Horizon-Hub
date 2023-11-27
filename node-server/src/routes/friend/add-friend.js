const router = require("express").Router();
const User = require("../../mongo/schema/userSchema");
const auth = require("../../middlewares/auth.middleware");
const findFriendInUserSubCollection = require("../../utils/find-friend-in-user");
const { v4: uuidv4 } = require('uuid');

router.put("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const friend_data = req.body.friend_data;
    if (!friend_data) return res.status(400).send("No friend data provided.");

    const friend = await User.findOne({ email: friend_data.email }).select(["_id", "name", "email",]);
    if (!friend) return res.status(404).send("Friend not found.");

    const isFound = await findFriendInUserSubCollection(user, friend._id);
    if (isFound) return res.status(400).send(`Friend is already (in) ${isFound.subMessage}.`);

    const conversationID = uuidv4();

    const updatedUser = await user.updateOne(
        {
            $push: {
                friends: { friend: friend._id, lastMessage: null, lastMessageText: null, conversationID: conversationID }
            }
        },
        { new: true }
    );

    await friend.updateOne(
        {
            $push: {
                friends: { friend: user._id, conversationID: conversationID }
            }
        },
        {
            new: true
        }
    );

    res.status(200).json({
        data: updatedUser,
        message: "Friend added successfully.",
        error: null,
    });
});

module.exports = router;