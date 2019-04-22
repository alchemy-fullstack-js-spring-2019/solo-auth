require('dotenv').config();
const jwt = require('jsonwebtoken');

function tokenize(payload) {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '24h' });
}

function untokenize(token) {
  const body = jwt.verify(token, process.env.AUTH_SECRET);
  return body.payload;
}

module.exports = { tokenize, untokenize };
