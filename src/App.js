const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// ggogle oauth refresh token
const refresh_token = process.env.REFESH_TOKEN;
const access_token = process.env.ACCESS_TOKEN;

const myOauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

myOauth2Client.setCredentials({ refresh_token });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "emmanueluzor919@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: refresh_token,
    accessToken: access_token,
  },
});

const checkEmailExist = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.send("email is required");
  } else {
    next();
  }
};
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.post("/email/send", checkEmailExist, (req, res) => {
  const { email } = req.body;
  console.log(email);
  const mailOpiton = {
    to: email,
    from: "emmanueluzor919@gmail.com",
    subject: "Testing email Service",
    html: "<div><h1>We are testing email functioality</h1></div>",
  };
  transport.sendMail(mailOpiton, (error) => {
    if (error) {
      console.log(error);
      res.send("Something went wrong");
    } else {
      res.send("email send successfully");
    }
  });
});

module.exports = app;
