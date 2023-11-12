const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../../utils/get-env");

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
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Users",
  },
  blockedFriends: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Users",
  },
  mutedFriends: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Users",
  },
  pinnedFriends: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Users",
  },
  unknownFriends: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Users",
  },
  groups: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Groups",
  },
  messages: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Messages",
  },
  unreadMessages: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: "Messages",
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
