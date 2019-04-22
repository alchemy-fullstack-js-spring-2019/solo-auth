const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const EXPIRES_IN = '1d';

function tokenize(payload) {
  const token = jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
  return token;
}

function untokenize(token) {
  const obj = jwt.verify(token, process.env.AUTH_SECRET);
  return obj.payload;
}

module.exports = {
  tokenize,
  untokenize
};
