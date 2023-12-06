const router = require("express").Router();
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");
const _ = require("lodash");
const { validateUserUpdateData } = require("./../../utils/validators");

router.put("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const updatedData = req.body.updatedData;
    if (!updatedData) return res.status(400).send("No updated data provided.");

    const error = await validateUserUpdateData(updatedData);
    if (error) return res.status(400).send(`error: ${error.details[0].message}`);

    const updateKeys = Object.keys(_.pick(updatedData, ["name", "email", "phone"]));
    updateKeys.forEach((updateKey) => {
        user[updateKey] = updatedData[updateKey];
    });
    await user.save();

    res.status(200).json({
        data: _.pick(user, ["_id", "name", "email", "phone"]),
        message: "Profile updated successfully.",
        error: null,
    });
});

module.exports = router;