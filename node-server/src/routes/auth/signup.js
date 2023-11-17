// ---------------------------------IMPORTS
const router = require("express").Router();
const User = require("../../mongo/schema/userSchema");
const { validateSignupData } = require("../../utils/validators");
const _ = require("lodash");

router.post("/", async (req, res) => {
    const error = await validateSignupData(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(200).send("User already registered.");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    });

    user.password = await user.genrateHashedPassword(req.body.password);
    await user.save();

    const token = `Bearer ${user.genrateAuthToken()}`;
    res
        .header("x-auth-token", token)
        .json({
            token,
            data: _.pick(user, ["_id", "name", "email", "phone", "profilePic"]),
            message: "Signup successful.",
            error: null,
        })
        .status(200);
});

module.exports = router;
