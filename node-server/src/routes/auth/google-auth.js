const passport = require('passport');
const router = require('express').Router();

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/failure'
}))

router.get('/success', (req, res) => {
    res.send("success");
});

router.get('/failure', (req, res) => {
    res.send("failure");
});

module.exports = router;