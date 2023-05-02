const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const buildMailObj = (to, subject, text) => {
  return {
    from: process.env.SLS_EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };
}

module.exports.sendEmail = async (receiver) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SLS_EMAIL_USER,
      pass: process.env.SLS_EMAIL_PASSWORD,
    },
  });

  const mailOptions = buildMailObj(receiver, "teste", "oioi")

  try {
    console.log("chegou aqui", mailOptions);
    // const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}