const {
  createAttendanceService,
  userAttendancesService,
  findUsers,
} = require("../services/attendance.service");
const error = require("../utils/error");
const { isValidId } = require("../utils/validation");

// perticipate in attendance
async function perticipateAttendance(req, res, next) {
  try {
    const user = req.body.user;

    if (!user.rank.includes("user"))
      throw error("only user can perticipate in attedance", 401);

    const attendace = await createAttendanceService(user._id);

    if (!attendace)
      return res.status(500).json({ msg: "something went wrong" });

    res.status(201).send(attendace);
  } catch (e) {
    next(e);
  }
}

// find users all atttendances
async function userAttendances(req, res) {
  const userId = req.query.id;

  if (!userId)
    return res.status(406).json({ msg: "invalid user id" });
  const attendances = await userAttendancesService(userId);

  res.status(200).send(attendances);
}

// find all users under individual attendance sheet
async function attendanceSheetUsers(req,res){
    const id = req.query.id
    if (!id)
    return res.status(406).json({ msg: "invalid attendace sheet id" });

    const users = await findUsers(id)

    res.status(200).send(users)
}

module.exports = { perticipateAttendance, userAttendances,attendanceSheetUsers };
