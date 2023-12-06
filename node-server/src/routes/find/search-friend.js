const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");

router.get("/", auth, async (req, res) => {
    let users;
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const searchStr = req.query.s;
    if (!searchStr) return res.status(400).send("No search (s) query provided.");

    users = await User.find({ userName: { $regex: searchStr, $options: "i" } }).select(["_id", "name", "userName", "email"]);

    if (!users.length) {
        users = await User.find({ name: { $regex: searchStr, $options: "i" } }).select(["_id", "name", "userName", "email"]);
    }

    if (!users.length) {
        users = await User.find({ email: { $regex: searchStr, $options: "i" } }).select(["_id", "name", "userName", "email"]);
    }

    if (!users.length) return res.status(404).send("No user found.");

    res.status(200).json({
        data: users,
        message: "Users found successfully.",
        error: null,
    });
});

module.exports = router;