const router = require('express').Router();
const authMW = require('./../../middlewares/auth.middleware');
const Group = require('./../../mongo/schema/groupSchema');
const User = require('./../../mongo/schema/userSchema');
const findMemberInGroupMemberList = require('./../../utils/find-member-in-group');

router.put('/', authMW, async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('User not found');

    const groupData = req.body.groupData;
    if (!groupData) return res.status(400).send('Group data not provided');

    if (!groupData._id) return res.status(400).send('group id not provided');
    const group = await Group.findById(groupData._id);
    if (!group) return res.status(400).send('Group not found');

    if (!groupData.members) return res.status(400).send('Members not found');

    if (group.admin.toString() != user._id.toString())
        return res.status(400).send('You are not admin of this group');
    const result = {}
    groupData.members.forEach(async (member) => {

        const memberUser = await User.findOne({ email: member });
        if (!memberUser) {
            result = {
                status: 400,
                data: null,
                message: null,
                error: `User ${member} not found`,
            }
            return
        }

        const isMember = await findMemberInGroupMemberList(group, memberUser._id);
        if (isMember) {
            result = {
                status: 400,
                data: null,
                message: null,
                error: `User is ${isMember.subMessage}`,
            }
            return
        }

        group.members.push(memberUser._id);
    });

    const savedGroup = await group.save();
    result.status(res.statusCode).send({
        data: { ...result.data, savedGroup },
        message: result.message,
        error: result.error,
    });
});

router.put('/member/:email', authMW, async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('User not found');

    const groupData = req.body.groupData;
    if (!groupData) return res.status(400).send('Group data not provided');

    if (!groupData._id) return res.status(400).send('group id not provided');
    const group = await Group.findById(groupData._id);
    if (!group) return res.status(400).send('Group not found');

    const member = await User.findOne({ email: req.params.email });
    if (!member) return res.status(400).send('user not found');

    const isMember = await findMemberInGroupMemberList(group, member._id);
    if (isMember) return res.status(400).send(`User is ${isMember.subMessage}`);

    const savedGroup = await Group.findByIdAndUpdate(group._id,
        {
            $push: {
                members: member._id
            }
        }, { new: true });

    res.status(200).send({
        data: savedGroup,
        message: 'Member added successfully',
        error: null,
    });
});

module.exports = router;