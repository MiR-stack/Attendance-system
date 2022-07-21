const {
  createAttendaceService,
  findAttendanceService,
} = require("../services/attendanceSheet.service");

// create new attendance button
async function createAttendance(req, res) {
  const timeLimit = req.body.timeLimit;
  let attendace = await findAttendanceService();
  if (attendace)
    return res.status(406).json({ msg: "  already have a running attendance" });
  attendace = await createAttendaceService(timeLimit);

  if (!attendace) return res.status(500).json({ msg: "something went wrong" });

  // change status after timelimit automitacally
  setTimeout(() => {
    attendace.status = "complete";
    attendace.save();
  }, 1000 * 60 * attendace.timeLimit);

  res.status(201).send(attendace);
}

// change attandance status

async function changeStatus(_req, res) {
  const running = await findAttendanceService();
  if (!running) return res.status(404).json({ msg: "no running attandance" });
  running.status = "completed";
  await running.save();
  res.send("attandance completed");
}

module.exports = { createAttendance ,changeStatus};
