const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../../utils/get-env");

const friendSchema = new mongoose.Schema({
  friendId: {
    type: mongoose.Types.ObjectId,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    ref: "Users",
  },
  lastMessage: {
    type: String,
    required: false,
    maxlength: 255,
    ref: "Messages",
  },
});

const groupSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Types.ObjectId,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    ref: "Groups",
  },
  lastMessage: {
    type: String,
    required: false,
    maxlength: 255,
    ref: "Messages",
  },
});

const messageSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Types.ObjectId,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    ref: "Messages",
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
    minlength: 5,
    maxlength: 1024,
    ref: "Users",
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  phone: { type: Number, required: false, minlength: 10, maxlength: 10 },
  enrollmentNumber: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 14,
    unique: true,
  },
  profilePic: { type: String, required: false, minlength: 5, maxlength: 1024 },
  isOnline: { type: Boolean, required: false, default: false },
  lastSeen: { type: String, required: false, minlength: 5, maxlength: 255 },
  isDeleted: { type: Boolean, required: false, default: false },
  status: { type: String, required: false, minlength: 5, maxlength: 255 },
  friends: {
    type: [friendSchema],
    required: false,
  },
  blockedFriends: {
    type: [friendSchema],
    required: false,
  },
  mutedFriends: {
    type: [friendSchema],
    required: false,
  },
  pinnedFriends: {
    type: [friendSchema],
    required: false,
  },
  unknownFriends: {
    type: [friendSchema],
    required: false,
  },
  groups: {
    type: [groupSchema],
    required: false,
  },
  messages: {
    type: [messageSchema],
    required: false,
  },
  unreadMessages: {
    type: [mmessageSchema],
    required: false,
  },
});

userSchema.methods.genrateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, phone: this.phone, enrollmentNumber: this.enrollmentNumber },
    JWT_PRIVATE_KEY,
    { expiresIn: "24h" }
  );
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
