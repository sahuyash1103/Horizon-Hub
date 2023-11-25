const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    message: {
        type: mongoose.Types.ObjectId,
        ref: "Messages",
        required: true,
        // unique: true,
    },
    sentBy: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    sentTo: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
});

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    discription: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    admin: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    createdOn: {
        type: String,
        required: true,
    },

    profilePic: { type: String, required: false },
    members: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Users",
    },
    kickedMembers: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Users",
    },
    suspandMembers: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Users",
    },
    mutedMembers: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Users",
    },
    messages: {
        type: [messageSchema],
    },
    isBanned: {
        type: Boolean,
        required: false,
        default: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
});

groupSchema.methods.validate = function (group) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        discription: Joi.string(),
        status: Joi.string().max(250),
        admin: Joi.string().required(),
        createdOn: Joi.string().required(),
        profilePic: Joi.string(),
        members: Joi.array().items(Joi.string()),
        kickedMembers: Joi.array().items(Joi.string()),
        suspanedMembers: Joi.array().items(Joi.string()),
        mutedMembers: Joi.array().items(Joi.string()),
        messages: Joi.array().items(Joi.string()),
        isBanned: Joi.boolean(),
        isActive: Joi.boolean(),
        isDeleted: Joi.boolean(),
    });
    return schema.validate(group);
};

const Group = mongoose.model("Groups", groupSchema);

module.exports = Group;
