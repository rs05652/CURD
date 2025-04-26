const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rs05652@gmail.com', 
    pass: 'kkbg hsnc nieg slek'

  }
});

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: 'rishabhsrivastava026@gmail.com',
    to: email,
    subject: 'Your OTP for Login/Signup',
    text: `Your OTP is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtp;
