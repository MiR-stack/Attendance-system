const { perticipateAttendance, userAttendances, attendanceSheetUsers } = require('../controller/attendance.controller');

const router = require('express').Router()


// perticipate in attandance
/**
 * each user can perticipate only once
 */
router.get('/',perticipateAttendance)

// get individul user all attendances
/**
 * get attendances by user id
 */
router.get('/user/attendances',userAttendances)


// get perticipate all user under individual attendanceSheet
/**
 * get attended users by attendanceSheet id
 */
router.get('/attendanceSheet/users',attendanceSheetUsers)

module.exports = router;