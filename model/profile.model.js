const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  phone: Number,
  avater: String,
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
