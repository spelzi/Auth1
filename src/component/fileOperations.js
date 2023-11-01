// file-operations.js
const fs = require("fs");

// Create a file named "welcome.txt" with content "Hello Node."
fs.writeFileSync("welcome.txt", "Hello Node");

// Read and log the content of "welcome.txt."
const content = fs.readFileSync("welcome.txt", "utf8");
console.log(content);
