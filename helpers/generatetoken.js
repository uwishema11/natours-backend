const jwt = require('jsonwebtoken');

const authToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = authToken;
