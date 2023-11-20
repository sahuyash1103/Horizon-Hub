// ---------------------------------IMPORTS
const router = require("express").Router();
const passport = require("passport");

router.get('/',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback',
    passport.authenticate('github', { failureRedirect: '/api/auth/github/failure' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.json({
            message: "Github authentication successful",
            error: null,
        });
    });

router.get("/failure", (req, res) => {
    res.send("Github authentication failed");
});

module.exports = router;
