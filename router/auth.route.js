const router = require('express').Router()
const {registration,  login}  = require('../controller/auth.controller')

// create user
router.post('/registration',registration)

// login user
router.post('/login',login)

module.exports = router