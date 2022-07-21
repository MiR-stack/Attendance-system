const Attendance = require("../model/attendance.model");
const error = require("../utils/error");
const { findAttendanceService } = require("./attendanceSheet.service");

async function createAttendanceService(userId) {
  const attendanceSheet = await findAttendanceService();
  if (!attendanceSheet) throw error("not running any attedance sheet", 404);

  let attendace = await Attendance.findOne({ userID: userId });

  if (attendace) throw error("already attended");

  attendace = new Attendance({
    userID: userId,
    attendanceSheetID: attendanceSheet._id,
  });

  return attendace.save();
}

// find user all attendances
function userAttendancesService(userId) {
  return Attendance.find({ userID: userId });
}

// find users under individual attendance sheet
function findUsers(attendanceSheetID) {
  return Attendance.find({ attendanceSheetID });
}

module.exports = { createAttendanceService, userAttendancesService, findUsers };
