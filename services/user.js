const User = require("../model/user.model");

function findUserByKey(key, value) {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
}

function createNewUser(name, email, password, roll) {
  let user = new User({ name, email, password, roll });
  user = user.save();
  return user;
}

module.exports = { findUserByKey, createNewUser };
