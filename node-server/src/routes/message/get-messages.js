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

router.get('/:email', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate("messages.message unreadMessages.message");
    if (!user)
        return res.status(400).json({ message: 'User not found' });

    const friend = await User.findOne({ email: req.params.email });
    if (!friend)
        return res.status(400).json({ message: 'Friend not found' });

    let conversationId = user.friends.find(f => f.friend.toString() === friend._id.toString())?.conversationId;
    if (!conversationId)
        return res.status(400).json({ message: 'Conversation not found' });

    let messages = user.messages.filter(message => message.conversationId !== conversationId);
    let unreadMessages = user.unreadMessages.filter(message => message.conversationId !== conversationId);

    res
        .status(200)
        .json({
            data: { conversationId, messages: [...messages, ...unreadMessages] },
            message: 'Messages fetched successfully',
            error: null
        });
});

module.exports = router;