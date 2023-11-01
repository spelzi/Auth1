const express = require("express");
const app = express();
const path = require("path");

// Middleware to restrict access during working hours
app.use((req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hours = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 9 && hours < 17) {
    next(); // Continue to the routes
  } else {
    res.send(
      "The application is only available during working hours (Monday to Friday, 9:00 AM to 5:00 PM)."
    );
  }
});

// Serve static files (like styles and images)
app.use(express.static(path.resolve(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/contact.html"));
});

module.exports = app;
