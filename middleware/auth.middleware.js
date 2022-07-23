const jwt = require("jsonwebtoken");
const { findUserByKey } = require("../services/user.service");
const error = require("../utils/error");

async function auth(req, res, next) {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "unauthorized" });

  token = token.split(" ")[1];

  let user = jwt.verify(token, process.env.SECRET_KEY);

  if (!user) return res.status(401).json({ msg: "unauthorized" });

  user = await findUserByKey("email", user.email);

  if (!user) return res.status(401).json({ msg: "unauthorized" });

  req.body.user = user;

  next();
}

function adminAuth(req,_res,next){
  if(!req.body.user.rank.includes('admin')) throw error('unauthorized',401) 

  next()
}


module.exports = { auth ,adminAuth};
