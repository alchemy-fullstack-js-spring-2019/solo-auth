require('dotenv').config();
const jwt = require('jsonwebtoken');

function tokenize(payload) {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '24h' });
}

module.exports = tokenize;
