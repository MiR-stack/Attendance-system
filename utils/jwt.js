const jwt = require("jsonwebtoken");

function genarateJwtToken(data) {
  return jwt.sign(data,process.env.SECRET_KEY)
}



module.exports = genarateJwtToken