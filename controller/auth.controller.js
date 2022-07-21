const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { findUserByKey, createNewUser, createUserByAdmin } = require("../services/user.service");
const error = require("../utils/error");
const hashPassword = require("../utils/password_hash");
const genarateJwtToken = require("../utils/jwt");
const { createProfile } = require("../services/profile.service");


// registration
async function registration(req, res, next) {
  try {
    const { name, email, password, roll } = req.body;

    if (!name || !email || !password || !roll) {
      res.status(400).json({ msg: "something is missing" });
    }

    let user = await findUserByKey("email", email);
    let existroll =  await findUserByKey("roll", roll);

    if (user)  throw error("invalid email");
    if (existroll)  throw error("roll no already exist")

    const admin = req.body.user
    if(admin){
      if(admin.rank.includes('admin')) {
        req.body.password = await hashPassword(req.body.password)
        user = await createUserByAdmin(req.body);
       var profile = await createProfile(user._id)
      }else{
        throw error('unauthorized',403)
      }
    }else{
      user = await createNewUser(name, email, await hashPassword(password), roll);
    }


    const token = genarateJwtToken(user._doc);
    delete user._doc.password;

    res.status(201).json({ msg: `user created successfully`, user,profile, token });
  } catch (e) {
    next(e);
  }
}

// find all user
async function findUser(req, res) {
 
  const user = await User.find()

  res.send(user)

}

// login user
async function login(req, res,next) {
  const { email, password } = req.body;

 try{
  let user = await findUserByKey('email',email);

  if (!user)  throw error("invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw error('invalid email or password')

  const token = genarateJwtToken(user._doc);


  delete user._doc.password;

  res.status(200).json({user,token});
 }catch(e){
  next(e)
 }
}

// delete all users
async function deleteAll(_req, res, next) {
  try {
    const user = await User.deleteMany();
    res.status(200).json({ msg: "all user deleted", user });
  } catch (e) {
    next(e);
  }
}

module.exports = { registration, deleteAll, findUser, login };
