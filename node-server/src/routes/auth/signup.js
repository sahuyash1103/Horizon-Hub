// ---------------------------------IMPORTS
const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const { validateSignupData } = require("./../../utils/validators");
const { generateAvatarFromName } = require("./../../utils/generate-avatar");
const _ = require("lodash");
const { storeProfilePic } = require("./../../firebase/storage/storage");

router.post("/", async (req, res) => {
    const error = await validateSignupData(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(200).send("User already registered.");

    user = await User.findOne({ userName: req.body.email.split("@")[0] });
    if (user) return res.status(200).send("User already registered.");

    user = new User({
        name: req.body.name,
        userName: req.body.userName || req.body.email.split("@")[0],
        email: req.body.email,
        phone: req.body.phone,
    });

    const profilePic = generateAvatarFromName(user.name);
    const profilePicUrl = await storeProfilePic(profilePic, user._id);

    user.profilePic = profilePicUrl;
    user.password = await user.genrateHashedPassword(req.body.password);
    const savedUser = await user.save();

    const token = `Bearer ${user.generateAuthToken()}`;
    req.session.user = { token: token }
    res
        .json({
            token,
            data: _.pick(savedUser, ["_id", "name", "email", "phone", "profilePic"]),
            message: "Signup successful.",
            error: null,
        })
        .status(200);
});

module.exports = router;
