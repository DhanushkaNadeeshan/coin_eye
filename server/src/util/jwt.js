const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function createToken(data) {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: "1d",
  });
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { createToken, validateToken };
