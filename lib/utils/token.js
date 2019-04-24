const jwt = require('jsonwebtoken');
require('dotenv').config();

const EXPIRES_IN = '1d';

const tokenize = payload => {
  return jwt.sign(
    { payload },
    process.env.AUTH_SECRET,
    { expiresIn: EXPIRES_IN });
};

const untokenize = token => {
  return jwt.verify(token, process.env.AUTH_SECRET).payload;
};

module.exports = {
  tokenize,
  untokenize
};
