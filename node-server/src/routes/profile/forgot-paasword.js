const router = require("express").Router();
const User = require("../../mongo/schema/userSchema");
const auth = require("../../middlewares/auth.middleware");
const { validateChangePasswordData } = require("../../utils/validators");
// const nodmailer = require("nodemailer");

router.get('/')

router.put("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found.");

    const newPassword = req.body.newPassword;
    if (!newPassword) return res.status(400).send("error: ", error.details[0].message);

    const isPasswordCorrect = await user.verifyPassword(oldPassword);
    if (!isPasswordCorrect) return res.status(400).send("Incorrect password.");

    user.password = user.genrateHashedPassword(newPassword);
    await user.save();

    res.status(200).json({
        message: "Password changed successfully.",
        error: null,
    });
});

module.exports = router;