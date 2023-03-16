const nodemailer = require("nodemailer");
const sendEmail = (email,id,token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  var mailOptions = {
    from:process.env.EMAIL,
    to: email,
    subject: "Password reset",
    html: `
        <p> You are requested for password reset</p>
        <h5>click here <a href="http//localhost:3000/reset/${id}/${token}" >link </a>to reset password</h5>
        <p> This is only valid for 15 minutes`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent succesfully" + info.response);
    }
  });
};

module.exports = {
  sendEmail,
};
