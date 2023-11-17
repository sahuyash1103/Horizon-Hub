const passport = require('passport');
const router = require('express').Router();
require("../../passport/index");

router.get('/', (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] });
});

router.get('/callback', (req, res) => {
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    })
});

router.get('/success', (req, res) => {
    res.send("success");
});

router.get('/failure', (req, res) => {
    res.send("failure");
});

module.exports = router;