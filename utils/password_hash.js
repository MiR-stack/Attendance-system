const bcrypt = require("bcrypt");
const error = require("./error");

async function hashPassword(password) {
  if (!password) throw error("password not needed", 400);

  return bcrypt.hash(password, 10);
}

module.exports = hashPassword;
