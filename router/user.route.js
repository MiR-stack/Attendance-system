const { getuser,deleteUser, getProfile, updateProfile, updateUserInfo } = require('../controller/user.controller')

const router = require('express').Router()


// get individual user
router.get('/' ,getuser)

// update user information
router.patch('/',updateUserInfo)

// delete user
/**
 * private route
 * if admin request delete user
 * TODO if user request checK user email and deleted account email. if matches delete user
 */
router.delete('/',deleteUser)

// get profile
router.get('/profile',getProfile)

// update user
router.patch('/profile',updateProfile)





module.exports = router