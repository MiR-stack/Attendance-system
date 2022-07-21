const User = require("../model/user.model");
const { createProfile, findProfileByUserId } = require("./profile.service");

function findUserByKey(key, value) {
  if (key === "_id") {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) return;
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
}

// delte user by key
function deleteUserByKey(key, value) {
  if (key === "_id") {
    return User.findByIdAndDelete(value);
  }
  return User.findOneAndDelete({ [key]: value });
}

// creating new user
function createNewUser(name, email, password, roll) {
  let user = new User({ name, email, password, roll });
  user = user.save();
  return user;
}

// create new user by admin
function createUserByAdmin(data) {
  let user = new User(data);
  user = user.save();
  return user;
}

// update user information
async function updateUser(_id, data, isAdmin) {
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) return;

  let user = await User.findOne({ _id });
  if (!user) return;

  if (isAdmin) {
    for (v in data) {
      if (v === "accountStatus" && data[v] === "active") {
        const profile = await findProfileByUserId(user._id)
        if(!profile) await createProfile(user._id);
        
      }
      user[v] = data[v];
    }
    return user.save();
  }

  const { name } = data;
  user.name = name;
  return user.save();
}

module.exports = {
  findUserByKey,
  deleteUserByKey,
  createNewUser,
  createUserByAdmin,
  updateUser,
};
