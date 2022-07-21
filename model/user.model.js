const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required"],
    minlength: [4, "minimum 4 charater nedeed"],
    maxlength: [20, "max 20 charater "],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (prop) => `${prop.value} this email is not validate`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "min 6 charcter needed"],
  },
  accountStatus: {
    type: String,
    enum: ["pending", "active", "rejected"],
    required: true,
    default: "pending",
  },
  rank: {
    type: [String],
    enum: ["admin", "modarator", "user"],
    default: ["user"],
  },
  roll: {
    type: Number,
    unique: [true, "already used this roll"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
