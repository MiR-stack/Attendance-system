const app = require("./app");
require("dotenv").config();
const dbConnection = require("./db");
const port = process.env.PORT || 3000;

dbConnection("mongodb://localhost:27017/attendanceDB")
  .then(() => {
    console.log("database connected");

    app.listen(port, () => {
      console.log(
        `your app is running successfully on http://localhost:${port}`
      );
    });
  })
  .catch((err) => console.log(err));
