const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    discription: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    status: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    admin: {
        type: mongoose.Types.ObjectId,
        required: true,
        minlength: 5,
        maxlength: 1024,
        ref: "Users",
    },
    createdOn: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },

    profilePic: { type: String, required: true, minlength: 5, maxlength: 1024 },
    members: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Users",
    },
    messages: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Messages",
    },
});

const Group = mongoose.model("Groups", groupSchema);

module.exports = Group;
