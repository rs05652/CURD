const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: String,
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  otp: String,
  otpVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
