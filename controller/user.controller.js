const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { findUserByKey, createNewUser } = require("../services/user");
const error = require("../utils/error");
const hashPassword = require("../utils/password_hash");
const genarateJwtToken = require("../utils/jwt");


// registration
async function registration(req, res, next) {
  try {
    const { name, email, password, roll } = req.body;

    if (!name || !email || !password || !roll) {
      res.status(400).json({ msg: "something is missing" });
    }

    let user = await findUserByKey("email", email);

    if (user) throw error("invalid email");

    user = await createNewUser(name, email, await hashPassword(password), roll);

    const token = genarateJwtToken(user._doc);
    delete user._doc.password;

    res.status(201).json({ msg: `user created successfully`, user, token });
  } catch (e) {
    next(e);
  }
}

// find all user
async function findUser(_req, res) {
  const users = await User.find();
  res.status(200).send(users);
}

// login user
async function login(req, res) {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "invalid email or password" });
  }

  delete user._doc.password;

  res.status(200).send(user);
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
