const router = require("express").Router();
const multer = require("multer");
const authMW = require("../../middlewares/auth.middleware");
const Group = require("../../mongo/schema/groupSchema");
const User = require("../../mongo/schema/userSchema");
const { storeProfilePic } = require("../../firebase/storage/storage");

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.put('/profile-pic', authMW, upload.single('profilePic'), async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("User not found");

    const profilePic = req.file;
    if (!profilePic) return res.status(400).send("Profile pic not provided");

    const groupData = req.body.groupData;
    if (!groupData) return res.status(400).send("Group data not provided");

    if (!groupData._id) return res.status(400).send("group id not provided");
    const group = await Group.findById(groupData._id);
    if (!group) return res.status(400).send("Group not found");

    if (group.admin.toString() != user._id.toString())
        return res.status(400).send("You are not admin of this group");

    const profilePicUrl = await storeProfilePic(profilePic, user._id);
    const updatedGroup = await group.updateOne({ $set: { profilePic: profilePicUrl } }, { new: true });

    res.status(200).send({
        data: updatedGroup,
        message: "Group profile pic updated successfully",
        error: null,
    });
});

module.exports = router;