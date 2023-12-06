// ---------------------------------IMPORTS
const router = require("express").Router();
const passport = require("passport");
const { CLIENT_URL } = require("./../../utils/get-env");

router.get('/',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback', passport.authenticate('github', {
    successRedirect: CLIENT_URL, //"/api/auth/github/success"
    failureRedirect: '/api/auth/github/failure',
}));

router.get("/success", (req, res) => {
    res.send("Github authentication successful");
    // res.redirect(CLIENT_URL);
});

router.get("/failure", (req, res) => {
    res.send("Github authentication failed");
});

module.exports = router;
