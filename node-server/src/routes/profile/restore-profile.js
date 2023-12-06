const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");

router.put("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    user.isDeleted = false;
    await user.save();

    res.status(200).json({
        data: user,
        Message: "Profile deleted.",
        error: null,
    });
});

module.exports = router;