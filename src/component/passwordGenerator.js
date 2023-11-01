// password-generator.js
const passwordGenerator = require("generate-password");

// Create a function to generate a random password
function generateRandomPassword() {
  const password = passwordGenerator.generate({ length: 12 });
  console.log("Generated Password: " + password);
}

generateRandomPassword();
