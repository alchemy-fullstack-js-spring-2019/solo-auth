const jwt = require('jsonwebtoken');

const EXPIRES_IN = '1D';

function tokenize(payload) {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
}

function untokenize(token) {
  return jwt.verify(token, process.env.AUTH_SECRET).payload;
}


module.exports = {
  tokenize,
  untokenize
};
