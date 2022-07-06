const mongoose = require("mongoose");

const adminAttendanceSchema = mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["running", "complited"],
    default: "running",
  },
  timeLimit: Number,
});

const AdminAttendace = mongoose.model("adminAttendance", adminAttendanceSchema);

module.exports = AdminAttendace;
