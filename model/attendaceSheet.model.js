const mongoose = require("mongoose");

const attendanceSheetSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["running", "completed"],
    default: "running",
  },
  timeLimit: {
    type:Number,
    default:5
  },
},{timestamps:true});

const AttendanceSheet = mongoose.model("AttendanceSheet", attendanceSheetSchema);

module.exports = AttendanceSheet;
