const jwt = require('jsonwebtoken');

const EXPIRES_IN = '1D';

function tokenize(payload) {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
}

function untokenize(token) {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET).payload;
  } catch(error) {
    throw 'Bogus Token';
  }
}

module.exports = {
  tokenize,
  untokenize
};
