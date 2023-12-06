const router = require('express').Router();
const Message = require('../../mongo/schema/messageSchema');
const User = require('../../mongo/schema/userSchema');

router.get('/:mid', async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).select("-password -__v");

    if (!user)
        return res.status(400).json({ message: 'User not found' });

    const messageId = req.params.mid;
    if (!messageId)
        return res.status(400).json({ message: 'Message data not porvided' });

    const message = await Message.findOne({ _id: messageId });

    if (!message)
        return res.status(400).json({ message: 'Message not found' });

    if (message.sentTo !== user._id)
        return res.status(400).json({ message: 'Message not found' });

    await Message.findByIdAndUpdate(message._id, { isRead: true });

    const readMessage = user.unreadMessages.find((m) => m.message.toString() === messageId.toString());
    if (!readMessage) return res.status(400).json({ message: 'Message not found' });

    await User.findByIdAndUpdate(user._id,
        {
            $pull: { unreadMessages: readMessage },
            $push: { messages: readMessage }
        });

    res
        .status(200)
        .json({ data: message, error: null });
});

module.exports = router;