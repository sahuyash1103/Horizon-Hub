const passport = require('passport');
const { CLIENT_URL } = require('./../../utils/get-env');
const router = require('express').Router();

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL, //'/api/auth/google/success',
    failureRedirect: '/api/auth/google/failure'
}))

router.get('/success', (req, res) => {
    res.redirect(CLIENT_URL);
});

router.get('/failure', (req, res) => {
    res.send("failure");
});

module.exports = router;