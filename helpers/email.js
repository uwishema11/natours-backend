const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create transporter (service we will use )

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
    // activate in gmail "less secure app" option
  });
  // define the email options
  const mailOptions = {
    from: 'agility <agility@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send the email
  await transporter.sendMail(mailOptions);
};

module.exports.sendEmail = sendEmail;
