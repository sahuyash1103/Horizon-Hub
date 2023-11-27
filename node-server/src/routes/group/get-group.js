const router = require('express').Router();
const Group = require('../../mongo/schema/groupSchema');
const User = require('../../mongo/schema/userSchema');
const auth = require('../../middlewares/auth');

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send({ message: 'User not found' });

    const groupId = req.params.id;
    if (!groupId) return res.status(400).send({ message: 'Group id not provided' });

    const isGroupMember = user.groups.find(id => id.toString() === groupId.toString());
    if (!isGroupMember) return res.status(400).send({ message: 'You are not a member of this group' });

    const group = await Group.findById(req.params.id);
    if (!group) return res.status(400).send({ message: 'Group not found' });

    res.status(200).json({
        message: 'Group found',
        group: group,
        error: null
    });
});

module.exports = router;