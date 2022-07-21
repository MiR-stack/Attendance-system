const Profile = require("../model/profile.model");
const { isValidId } = require("../utils/validation");

// create profile
function createProfile(id) {
  const profile = new Profile({ userID: id });
  return profile.save();
}

// find profile by userId
function findProfileByUserId(id) {
  return Profile.findOne({ userID: id });
}

// update profile
async function updateProfileByUserId(userId, data) {
  if (!isValidId(userId)) return;
  let profile = await Profile.findOne({ userID: userId });
  if (!profile) return;

  for (v in data) {
    profile[v] = data[v];
  }
  return profile.save();
}

// delete profile
function deleteProfileByUserId(userId) {
  return Profile.findOneAndDelete({ userID: userId });
}

module.exports = {
  createProfile,
  findProfileByUserId,
  updateProfileByUserId,
  deleteProfileByUserId,
};
