const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");
const _ = require("lodash");

router.put("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const status = req.body.status;
    if (!status) return res.status(400).send("No status provided.");

    const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            $set: {
                status: status
            }
        }, { new: true });

    res.status(200).json({
        data: _.pick(updatedUser, ["_id", "name", "email", "phone", "profilePic", "status"]),
        message: "Status updated successfully.",
        error: null,
    });
});

module.exports = router;