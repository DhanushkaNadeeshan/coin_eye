const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function createToken(data) {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: "1d",
  });
}

function validateToken(token) {
  const data = {};
  try {
    data.reult = jwt.verify(token, JWT_SECRET);
    data.success = true;
  } catch (error) {
    data.success = false;
    data.error = error;
  }
  return data;
}

module.exports = { createToken, validateToken };
