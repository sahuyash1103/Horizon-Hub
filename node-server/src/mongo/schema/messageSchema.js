const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    reaction: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    reactedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        ref: "Users",
    },
    reactedOn: { type: String, required: true, minlength: 5, maxlength: 255 },
});

const messageSchema = new mongoose.Schema({
    messageType: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    message: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    sentOn: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    sentBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        minlength: 5,
        maxlength: 1024,
        ref: "Users",
    },
    sentTo: {
        type: mongoose.Types.ObjectId,
        required: false,
        minlength: 10,
        maxlength: 10,
        ref: "Users",
    },
    isSent: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    isReceived: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    isRead: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    isDeleted: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    isPinned: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    isStarred: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    isForwarded: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    forwardedTo: {
        type: [mongoose.Types.ObjectId],
        required: false,
        minlength: 10,
        maxlength: 10,
        ref: "Users",
    },
    isReplied: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    repliedMessage: { type: mongoose.Types.ObjectId, required: false, minlength: 10, maxlength: 10 },
    isEdited: { type: Boolean, required: false, minlength: 10, maxlength: 10 },
    editedMessage: { type: String, required: false, minlength: 10, maxlength: 10 },
    reactions: {
        type: reactionSchema, required: false, minlength: 10, maxlength: 10
    },
});

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
