const { registration } = require("../controller/auth.controller");
const { auth, adminAuth } = require("../middleware/auth.middleware");

const router = require("express").Router();

// create user by admin
router.post("/registration", registration);

// get all users

module.exports = router;
