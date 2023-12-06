const router = require('express').Router();
const authMW = require('../../middlewares/auth.middleware');
const Group = require('../../mongo/schema/groupSchema');
const User = require('../../mongo/schema/userSchema');
const { validateGroupData } = require('../../utils/validators');

router.post('/', authMW, async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('User not found');

    const groupData = req.body.groupData;
    if (!groupData) return res.status(400).send('Group data not provided');

    const isValid = await validateGroupData(groupData);
    if (isValid.error) return res.status(400).send(isValid.error.details[0].message);

    const group = new Group({
        name: groupData.name,
        discription: groupData.discription,
        status: groupData.status,
        profilePic: groupData.profilePic,
        admin: user._id,
        createdOn: new Date().toISOString(),
        members: [user._id, ...groupData.members],
    })
    try {
        const savedGroup = await group.save();
        User.findByIdAndUpdate( user._id, { $push: { groups: savedGroup._id } })
        res.status(200).send({
            data: savedGroup,
            message: 'Group created successfully',
            error: null,
        });
    } catch (err) {
        res.status(400).send({ error: err.message, message: null, data: null });
    }
})

module.exports = router;