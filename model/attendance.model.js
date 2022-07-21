const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  attendanceSheetID:{
    type:String,
    required:true
  }
},{timestamps:true});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
