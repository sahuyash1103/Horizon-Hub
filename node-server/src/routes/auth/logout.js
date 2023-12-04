const router = require('express').Router();

router.delete("/", async (req, res) => {
    req.logOut(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logout successful." });
    });
});

module.exports = router;