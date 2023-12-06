const router = require("express").Router();
const multer = require("multer");
const path = require('path');
const User = require("./../../mongo/schema/userSchema");
const auth = require("./../../middlewares/auth.middleware");
const { storeMessageImage, storeMessageDoc } = require("./../../firebase/storage/storage");
const Message = require("./../../mongo/schema/messageSchema");

const multerStorage = multer.memoryStorage();

const uploadImage = multer({
    storage: multerStorage,
    limits: { fileSize: 1 * 1024 * 1024 * 5 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
});

const uploadDoc = multer({ storage: multerStorage });

router.post("/image/:mid", auth, uploadImage.single('image'), async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const messageId = req.params.mid;
    if (!messageId) return res.status(400).send("No message data provided.");

    if (!messageId) return res.status(400).send("No message id provided.");

    try {
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).send("Message not found.");

        const isFound = message.sentBy.toString() === user._id.toString();
        if (!isFound) return res.status(400).send("You are not the sender of this message.");

        const image = req.file;
        if (!image) return res.status(400).send("No images provided.");

        const imgUrl = await storeMessageImage(image, message.conversationId, message._id);
        if (!imgUrl) return res.status(500).send("Error while uploading images.");

        const updatedMessage = await Message.findByIdAndUpdate(
            message._id,
            {
                $set: {
                    messageType: "Image",
                    fileUrl: imgUrl
                }
            }, { new: true });

        res.status(200).json({
            data: { message: updatedMessage },
            message: "Images uploaded successfully.",
            error: null,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/doc/:mid", auth, uploadDoc.single('doc'), async (req, res) => {
    const user = await User.findById(req.user._id).select(["-password", "-__v"]);
    if (!user) return res.status(404).send("User not found.");

    const messageId = req.params.mid;
    if (!messageId) return res.status(400).send("No message data provided.");

    if (!messageId) return res.status(400).send("No message id provided.");

    try {
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).send("Message not found.");

        const isFound = message.sentBy.toString() === user._id.toString();
        if (!isFound) return res.status(400).send("You are not the sender of this message.");

        const doc = req.file;
        if (!doc) return res.status(400).send("No doc provided.");

        const docUrl = await storeMessageDoc(doc, message.conversationId, message._id);
        if (!docUrl) return res.status(500).send("Error while uploading images.");

        const updatedMessage = await Message.findByIdAndUpdate(
            message._id,
            {
                $set: {
                    messageType: "Document",
                    fileUrl: docUrl
                }
            }, { new: true });

        res.status(200).json({
            data: { message: updatedMessage },
            message: "Document uploaded successfully.",
            error: null,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;