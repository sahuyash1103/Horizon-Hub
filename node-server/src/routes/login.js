const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../mongo/schema/userSchema");
const { validateLoginData } = require("../utils/validators");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const error = await validateLoginData(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("Invalid email or password.");

  const token = user.genrateAuthToken();
  res
    .header("x-auth-token", token)
    .json(
      _.pick(user, ["name", "email", "phone"])
    )
    .status(200);
});

module.exports = router;
