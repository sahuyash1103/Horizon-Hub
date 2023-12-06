const { boolean } = require("joi");
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    reaction: {
        type: String,
        required: true,
    },
    reactedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    reactedOn: { type: String, required: true },
});

const messageSchema = new mongoose.Schema({
    messageType: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: false,
    },
    conversationId: {
        type: String,
        required: true,
    },
    sentOn: {
        type: String,
        required: true,
    },
    sentBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    sentTo: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    isSent: { type: Boolean, required: false },
    isReceived: { type: Boolean, required: false },
    isRead: { type: Boolean, required: false },
    isDeleted: { type: Boolean, required: false },
    isPinned: { type: Boolean, required: false },
    isStarred: { type: Boolean, required: false },
    isForwarded: { type: Boolean, required: false },
    forwardedTo: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Users",
    },
    isGroupMessage: {
        type: Boolean,
        default: false
    },
    isReplied: { type: Boolean, required: false },
    repliedMessage: { type: mongoose.Types.ObjectId, required: false },
    isEdited: { type: Boolean, required: false },
    editedMessage: { type: String, required: false },
    reactions: {
        type: reactionSchema, required: false
    },
});

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
