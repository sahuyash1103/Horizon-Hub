const joi = require("joi");

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

async function validateSignupData(user) {

  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    userName: joi.string().min(3).max(50),
    email: joi.string().min(10).max(255).required().email(),
    password: joi.string().min(8).max(255).required(),
    phone: joi.string().length(10).pattern(phoneRegExp).required(),
    profilePic: joi.string().max(255),
  });

  try {
    await schema.validateAsync(user);
  } catch (err) {
    return err;
  }
}

async function validateLoginData(user) {
  const schema = joi.object({
    email: joi.string().min(10).max(255).email().optional(),
    unserName: joi.string().min(3).max(50).optional(),
    password: joi.string().min(8).max(255).required(),
  }).xor("email", "unserName");

  try {
    await schema.validateAsync(user);
  } catch (err) {
    return err;
  }
}

async function validateUserUpdateData(dataToUpdate) {
  const schema = joi.object({
    name: joi.string().min(3).max(50),
    email: joi.string().min(10).max(255).email(),
    phone: joi.string().length(10).pattern(phoneRegExp),
  });

  try {
    await schema.validateAsync(dataToUpdate);
  } catch (err) {
    return err;
  }
}

async function validateChangePasswordData(dataToUpdate) {
  const schema = joi.object({
    oldPassword: joi.string().min(8).max(255).required(),
    newPassword: joi.string().min(8).max(255).required(),
  });

  try {
    await schema.validateAsync(dataToUpdate);
  } catch (err) {
    return err;
  }
}

const validateGroupData = async (group) => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    discription: joi.string(),
    status: joi.string().max(250),
    admin: joi.string().required(),
    createdOn: joi.string().required(),
    profilePic: joi.string(),
    members: joi.array().items(joi.string()),
    kickedMembers: joi.array().items(joi.string()),
    suspanedMembers: joi.array().items(joi.string()),
    mutedMembers: joi.array().items(joi.string()),
    messages: joi.array().items(joi.string()),
    isBanned: joi.boolean(),
    isActive: joi.boolean(),
    isDeleted: joi.boolean(),
  });
  try {
    await schema.validateAsync(group);
  } catch (err) {
    return err;
  }
};

const validateUserRealTimeUpdateData = async (data) => {
  const schema = joi.object({
    onlineStatus: joi.boolean(),
    unreadMessages: joi.number(),
    lastMessage: joi.string(),
    profilePicture: joi.string(),
  });
  try {
    await schema.validateAsync(data);
  } catch (err) {
    return err;
  }
}

module.exports = {
  validateSignupData,
  validateLoginData,
  validateUserUpdateData,
  validateChangePasswordData,
  validateGroupData,
  validateUserRealTimeUpdateData,
};