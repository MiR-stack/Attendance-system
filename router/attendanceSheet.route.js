const { createAttendance, changeStatus } = require('../controller/attendanceSheet.controller')

const router = require('express').Router()


// create attendace 
router.post('/', createAttendance)

// update attendance status
router.get('/completed',changeStatus)





module.exports = router
