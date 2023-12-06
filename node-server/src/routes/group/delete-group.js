const router = require("express").Router();
const authMW = require("../../middlewares/auth.middleware");
const Group = require("../../mongo/schema/groupSchema");
const User = require("../../mongo/schema/userSchema");

router.delete("/", authMW, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("User not found");

    const groupData = req.body.groupData;
    if (!groupData) return res.status(400).send("Group data not provided");

    if (!groupData._id) return res.status(400).send("group id not provided");
    const group = await Group.findById(groupData._id);
    if (!group) return res.status(400).send("Group not found");

    if (group.admin.toString() != user._id.toString())
        return res.status(400).send("You are not admin of this group");

    const updatedGroup = await Group.findByIdAndUpdate(group._id,
        {
            $set: {
                isDeleted: true
            }
        }, { new: true });

    res.status(200).send({
        data: updatedGroup,
        message: "Group deleted successfully",
        error: null,
    });
});

module.exports = router;