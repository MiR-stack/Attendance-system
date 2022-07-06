const router = require('express').Router()
const {registration, deleteAll, findUser, login}  = require('../controller/user.controller')

// create user
router.post('/registration',registration)

// login user
router.post('/login',login)

// find all user
router.get('/',findUser)

// delete all user
router.delete('/deleteAll',deleteAll)

module.exports = router