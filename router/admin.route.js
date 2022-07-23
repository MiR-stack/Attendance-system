const {
  registration,
  findUser,
  deleteAll,
} = require("../controller/auth.controller");

const router = require("express").Router();

// create user by admin
router.post("/registration", registration);

// find all user
router.get("/users", findUser);

// delete all user
router.delete("/users/deleteAll", deleteAll);

module.exports = router;
