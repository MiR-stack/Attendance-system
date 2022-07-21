const router = require('express').Router()
const {registration, deleteAll, findUser, login}  = require('../controller/auth.controller')
const { auth, adminAuth } = require('../middleware/auth.middleware')

// create user
router.post('/registration',registration)

// login user
router.post('/login',login)

// find all user
router.get('/',auth,adminAuth, findUser)

// delete all user
router.delete('/deleteAll',auth,adminAuth,deleteAll)

module.exports = router