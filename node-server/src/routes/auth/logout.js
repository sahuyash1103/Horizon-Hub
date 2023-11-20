const router = require('express').Router();
const User = require("../../mongo/schema/userSchema");

router.post("/", async (req, res) => {
    req.logOut();
    res.status(200).json({ message: "Logout successful." });
});

module.exports = router;