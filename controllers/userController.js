const User = require('../models/user'); // Correct import
const userModel = require("../models/user");
const sendOtp = require('../utils/sendOtp');
const jwt = require('jsonwebtoken');



exports.readUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    // res.render("read", { users });
    res.status(200).json(users)
    
  } catch (err) {
    console.log("Error fetching users:", err);
    res.status(500).send("Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, Email, Image } = req.body;

    const createdUser = await userModel.create({
      name,
      email: Email,
      image: Image
    });

    // res.redirect("/read");
    res.status(200).json(createdUser)
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).send("Server Error");
  }
};
exports.editUser = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.params.userId });
    // res.render("edit", { user });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
};

exports.Update = async (req, res) => {
  const { name, email, image } = req.body; 
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.userid, 
      { name, email, image }, 
      { new: true }
    );
    res.status(200).json(updatedUser);
    // res.redirect("/read");  
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
};



exports.deleteUser = async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
  } catch (err) {
    console.log("Error deleting user:", err);
    res.status(500).send("Server Error");
  }
};


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send('User already exists');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({ name, email, password, otp });
    await user.save();

    await sendOtp(email, otp);

    // Now, after the user has been created and OTP sent, generate the token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    
    console.log("Generated Token:", token); 

    // Send the response with the token
    res.status(200).json({
      message: "Signup successful. OTP sent to email.",
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).send('Invalid OTP');
    }

    
    user.otpVerified = true;
    user.otp = '';  
    await user.save();

    res.status(200).send('OTP verified successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    if (user.password !== password) {
      return res.status(400).send('Invalid credentials');
    }

    if (!user.otpVerified) return res.status(403).send('Please verify OTP');

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log("Generated Token:", token); 
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};