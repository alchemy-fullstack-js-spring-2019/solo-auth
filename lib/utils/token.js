const jwt = require('jsonwebtoken');

const AUTH_SECRET = process.env.AUTH_SECRET;
const EXPIRES_IN = '1d';

function tokenize(payload) {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: EXPIRES_IN });
}

function untokenize(token) {
  return jwt.verify(token, AUTH_SECRET).payload;
}

module.exports = { tokenize, untokenize };
