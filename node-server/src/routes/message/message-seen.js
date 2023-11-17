const router = require('express').Router();
const Message = require('../../mongo/schema/messageSchema');
const User = require('../../mongo/schema/userSchema');

router.get('/', async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).select("-password -__v");

    if (!user)
        return res.status(400).json({ message: 'User not found' });

    const messageID = req.params.messageId;
    if (!messageID)
        return res.status(400).json({ message: 'Message data not porvided' });

    const message = await Message.findOne({ _id: messageID });

    if (!message)
        return res.status(400).json({ message: 'Message not found' });

    if (message.sentTo !== user._id)
        return res.status(400).json({ message: 'Message not found' });

    await message.updateOne({ isRead: true });

    res
        .status(200)
        .json({ data: message, error: null });
});

module.exports = router;