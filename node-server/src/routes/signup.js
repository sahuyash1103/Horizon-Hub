// ---------------------------------IMPORTS
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../mongo/schema/userSchema");
const { validateSignupData } = require("../utils/validators");
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

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    const token = user.genrateAuthToken();
    res
        .header("x-auth-token", token)
        .json(
            _.pick(user, ["name", "email", "phone"])
        )
        .status(200);
});

module.exports = router;
