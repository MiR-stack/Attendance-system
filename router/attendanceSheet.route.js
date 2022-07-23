const { createAttendance, changeStatus, runningSheet } = require('../controller/attendanceSheet.controller')
const { adminAuth } = require('../middleware/auth.middleware')

const router = require('express').Router()


// create attendace 
router.post('/',adminAuth, createAttendance)

//find running attendance sheet
router.get('/running',runningSheet)

// update attendance status
router.get('/completed',adminAuth,changeStatus)





module.exports = router
