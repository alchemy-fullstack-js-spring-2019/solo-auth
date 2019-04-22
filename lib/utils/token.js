const jwt = require('jsonwebtoken');

const AUTH_SECRET = process.env.AUTH_SECRET;
const EXPIRES_IN = '1d';

function signToken(payload) {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, AUTH_SECRET);
}

module.exports = { signToken, verifyToken };
