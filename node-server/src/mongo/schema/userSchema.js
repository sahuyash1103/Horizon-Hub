const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_PRIVATE_KEY } = require("./../../utils/get-env");

const friendSchema = new mongoose.Schema({
  friend: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    // unique: true,
    required: true,
  },
  conversationId: {
    type: String,
    required: true,
    // unique: true,
  },
  isAnonymous: { type: Boolean, default: false },
  lastMessage: {
    type: mongoose.Types.ObjectId,
    ref: "Messages",
  },
  lastMessageText: {
    type: String,
  },
  unreadMessages: {
    type: Number,
    default: 0,
  },
});

const messageSchema = new mongoose.Schema({
  message: {
    type: mongoose.Types.ObjectId,
    ref: "Messages",
    required: true,
    // unique: true,
  },
  isAnonymous: { type: Boolean, default: false },
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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    default: "local",
  },
  password: { type: String, required: false },
  phone: { type: Number, required: false },
  profilePic: { type: String, required: false },
  isOnline: { type: Boolean, required: false, default: false },
  lastSeen: { type: String, required: false },
  isDeleted: { type: Boolean, required: false, default: false },
  isSuspended: { type: Boolean, required: false, default: false },
  isLocked: { type: Boolean, required: false, default: false },
  status: { type: String, required: false },
  friends: {
    type: [friendSchema],
  },
  blockedFriends: {
    type: [friendSchema],
  },
  mutedFriends: {
    type: [friendSchema],
  },
  pinnedFriends: {
    type: [friendSchema],
  },
  unknownFriends: {
    type: [friendSchema],
  },
  groups: {
    type: [mongoose.Types.ObjectId],
    ref: "Groups",
    required: true,
    // unique: true,
  },
  messages: {
    type: [messageSchema],
  },
  unreadMessages: {
    type: [messageSchema],
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, userName: this.userName, email: this.email, phone: this.phone },
    JWT_PRIVATE_KEY,
    { expiresIn: "24h" }
  );
};

userSchema.methods.genrateHashedPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);

  password = await bcrypt.hash(password, salt);

  return password;
};

userSchema.methods.verifyPassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
