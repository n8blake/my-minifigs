require("dotenv").config();

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_NOREPLY_EMAIL,
    pass: process.env.NODEMAILER_NOREPLY_PASSW,
  },
});

module.exports = {
  sendEmail: function(address, subj, body, isHTML){
    const mailOptions = {
      from: process.env.NODEMAILER_NOREPLY_EMAIL,
      to: address,
      subject: subj,
    };
    if(isHTML){
      mailOptions.html = body;
    } else {
      mailOptions.text = body;
    }
    const mailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(info.response); 
        }
      });
    });    
    return mailPromise;
  }
};