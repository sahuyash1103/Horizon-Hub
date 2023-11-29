const router = require('express').Router();
const passport = require('passport');
const User = require("../../mongo/schema/userSchema");
const { validateLoginData } = require("../../utils/validators");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const error = await validateLoginData(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const user = await User.find({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid email or password.");

  if (user.isDeleted) return res.status(401).send("Profile is deleted.");

  if (user.isSuspended) return res.status(401).send("Profile is suspended.");

  if (user.isLocked) return res.status(401).send("Profile is locked.");

  const validPassword = await user.verifyPassword(req.body.password);
  if (!validPassword) return res.status(401).send("Invalid email or password.");

  const token = `Bearer ${user.genrateAuthToken()}`;
  req.session.user = { jwt: token }
  res
    .json({
      token,
      data: _.pick(user, ["_id", "name", "email", "phone", "profilePic"]),
      message: "Login successful.",
      error: null,
    })
    .status(200);
});

module.exports = router;
