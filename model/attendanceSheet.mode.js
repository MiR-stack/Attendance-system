const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  Date: {
    type: Date,
    default: new Date(),
  },
  userID: {
    type: String,
    required: true,
  },
});

const AttendanceSheet = mongoose.model("AttendanceSheet", attendanceSchema);

module.exports = AttendanceSheet;
