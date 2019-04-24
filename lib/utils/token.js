const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const EXPIRES_IN = '1d';

function tokenize(payload) {
  const token = jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
  return token;
}

function untokenize(token) {
  return jwt.verify(token, process.env.AUTH_SECRET).payload;
}

module.exports = {
  tokenize,
  untokenize
};
