const express = require("express");
const app = express();
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const morgan = require("morgan");
const userRouter = require("./router/user.route");

app.use(
  cors(),
  cookie_parser(),
  express.urlencoded({ extended: false }),
  express.json(),
  morgan()
);

app.use("/api/v1/user", userRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ msg: "connect successfully" });
});

app.use("*", (_req, res) => {
  res.status(404).json({ msg: "data not found" });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

module.exports = app;
