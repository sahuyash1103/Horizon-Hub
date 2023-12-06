const router = require('express').Router();
const User = require('./../../mongo/schema/userSchema');
const auth = require('./../../middlewares/auth.middleware');

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User not found');

    const token = `Bearer ${user.generateAuthToken()}`;
    if (!token) return res.status(500).send('Something went wrong');

    res.json({ token, message: 'Token generated successfully' });
});

router.get('/verify', auth, async (req, res) => {
    res.json({ message: 'Token is valid', data: { isValid: true } });
});

module.exports = router;