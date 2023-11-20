const router = require('express').Router();
const User = require('../../mongo/schema/userSchema');
const Message = require('../../mongo/schema/messageSchema');
const Group = require('../../mongo/schema/groupSchema');
const auth = require('../../middlewares/auth.middleware');

router.get('/', auth, async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).select("messages unreadMessages").populate("messages unreadMessages");

    if (!user)
        return res.status(400).json({ message: 'User not found' });

    res
        .status(200)
        .json({ data: user, error: null });
});

module.exports = router;