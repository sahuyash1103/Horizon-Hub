const router = require("express").Router();
const User = require("../../mongo/schema/userSchema");
const auth = require("../../middlewares/authenticate-user");

router.delete("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const friend_data = req.body.friend_data;
    if (!friend_data) return res.status(400).send("No friend data provided.");

    if (!user.pinnedFriends.includes(friend_data._id))
        return res.status(400).send("Friend already unpinned.");

    const index = user.pinnedFriends.indexOf(friend_data._id);
    user.pinnedFriends.splice(index, 1);
    await user.save();

    res.status(200).json({
        data: user.pinnedFriends,
        message: "Friend unpinned successfully.",
        error: null,
    });
});

module.exports = router;