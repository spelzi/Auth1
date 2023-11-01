// email-sender.js
const nodemailer = require("nodemailer");

// Create a transporter for sending emails (configure with your email provider)
const transporter = nodemailer.createTransport({
  service: "your-email-service",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

// Define the email data
const mailOptions = {
  from: "Uzoremma18@gmail.com",
  to: "recipient-email@example.com",
  subject: "Hello from Node.js",
  text: "This is a test email sent from Node.js using Nodemailer.",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error sending email: " + error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
