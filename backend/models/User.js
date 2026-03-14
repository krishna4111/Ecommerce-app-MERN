const mongoose = require("mongoose");
const { Roles } = require("../utils/commonConstants");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: Roles.USER,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
