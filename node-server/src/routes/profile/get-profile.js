const router = require("express").Router();
const User = require("../../mongo/schema/userSchema");
const auth = require("../../middlewares/auth.middleware");

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .select(["name", "email", "profilePic", "phone", "_id"]);
    if (!user) return res.status(404).send("User not found.");

    res.status(200).json({
        data: user,
        Message: "User found.",
        error: null,
    });
});

module.exports = router;