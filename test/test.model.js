const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
