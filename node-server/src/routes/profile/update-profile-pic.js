const router = require("express").Router();
const multer = require("multer");
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");
const { storeProfilePic } = require("./../../firebase/storage/storage");

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.put("/", auth, upload.single('profilePic'), async (req, res) => {
    const profilePic = req.file;

    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const profilePicUrl = await storeProfilePic(profilePic, user._id);

    const updatedUSer = await User.findByIdAndUpdate(user._id,
        {
            $set: {
                profilePic: profilePicUrl
            }
        }, { new: true });

    res.status(200).json({
        data: updatedUSer,
        Message: "Profile pic updated.",
        error: null,
    });
});

module.exports = router;