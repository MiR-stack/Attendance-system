const express = require("express");
const app = express();
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const morgan = require("morgan");
const authRouter = require("./router/auth.route");
const adminRouter = require("./router/admin.route");
const userRouter = require("./router/user.route");
const attendanceSheetRouter = require("./router/attendanceSheet.route");
const attendanceRouter = require("./router/attendance.route");
const { auth, adminAuth } = require("./middleware/auth.middleware");

app.use(
  cors(),
  cookie_parser(),
  express.urlencoded({ extended: false }),
  express.json(),
  morgan("dev")
);

app.use("/api/v1/admin", auth, adminAuth, adminRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", auth, userRouter);
app.use("/api/v1/attendanceSheet", auth, attendanceSheetRouter);
app.use('/api/v1/attendance',auth,attendanceRouter)

app.get("/health", (_req, res) => {
  res.status(200).json({ msg: "connect successfully" });
});

app.use("*", (_req, res) => {
  res.status(404).json({ msg: "data not found" });
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  }
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

module.exports = app;
