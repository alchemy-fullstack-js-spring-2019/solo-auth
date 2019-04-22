const jwt = require('jsonwebtoken');

const AUTH_SECRET = process.env.AUTH_SECRET;

const createToken = payload => {
  return jwt.sign({ payload }, AUTH_SECRET, { expiresIn: '1d' });
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
