const jwt = require('jsonwebtoken');

const AUTH_SECRET = process.env.AUTH_SECRET;
const EXPIRES_IN = '1d';

const createToken = payload => {
  return jwt.sign({ payload }, AUTH_SECRET, { expiresIn: EXPIRES_IN });
};

const verifyToken = token => {
  try {
    return jwt.verify(token, AUTH_SECRET).payload;
  } catch(err) {
    throw 'Bogus';
  }
};

module.exports = {
  createToken,
  verifyToken
};
