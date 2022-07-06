const mongoose = require("mongoose");

function connection(str) {
  return mongoose.connect(str, {
    serverSelectionTimeoutMS: 1000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = connection;
