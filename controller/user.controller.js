const { deleteUserAttendances } = require("../services/attendance.service");
const {
  findProfileByUserId,
  updateProfileByUserId,
  deleteProfileByUserId,
} = require("../services/profile.service");
const {
  findUserByKey,
  deleteUserByKey,
  updateUser,
} = require("../services/user.service");

// find user by id
async function getuser(req, res) {
  const id = req.query.id;

  let user = await findUserByKey("_id", id);

  if (!user) return res.status(404).json({ msg: "user not found" });

  delete user._doc.password;
  res.status(200).send(user);
}

// update user
async function updateUserInfo(req, res) {
  const id = req.query.id;
  const data = req.body;

  if(!id || !data) return res.status(404).json({msg:'invalid request'})

   const isAdmin = req.body.user.rank.includes('admin')
 const user = await updateUser(id, data,isAdmin);
 if(!user) return res.status(404).json({msg:'user not found'})

 res.status(205).send(user)

}

// delete user by id

async function deleteUser(req, res) {
  const id = req.query.id;

  let user = await findUserByKey("_id", id);

  if (!user) return res.status(404).json({ msg: "user not found" });
 
  await deleteUserAttendances(user._id)
  await deleteProfileByUserId(user._id);
  user = await deleteUserByKey("_id", id);

  res.send("user deleted successfully");
}

// get profile by userId
async function getProfile(req, res) {
  const userId = req.query.id;
  const profile = await findProfileByUserId(userId);
  if (!profile) return res.status(404).json({ msg: "profile not found" });

  res.status(200).send(profile);
}

// update profile
async function updateProfile(req, res) {
  const userId = req.query.id;
  const { phone, avater } = req.body;
  if (isNaN(phone)) return res.status(404).json({ msg: "invalid number" });
  const profile = await updateProfileByUserId(userId, { phone, avater });

  res.send(profile);
}

module.exports = { getuser, deleteUser, getProfile, updateProfile,updateUserInfo };
