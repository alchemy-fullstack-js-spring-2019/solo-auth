const jwt = require('jsonwebtoken');

const AUTH_SECRET = process.env.AUTH_SECRET;

const createToken = payload => {
  return jwt.sign({ payload }, AUTH_SECRET, { expiresIn: '1d' });
};

const verifyToken = token => {
  return jwt.verify(token, AUTH_SECRET);
};

module.exports = {
  createToken,
  verifyToken
};
