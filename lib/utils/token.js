require('dotenv').config();
const jwt = require('jsonwebtoken');

function tokenize(payload) {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '24h' });
}

function untokenize(token) {
  try {
    const body = jwt.verify(token, process.env.AUTH_SECRET);
    return body.payload;
  } catch(err) {
    throw 'Bogus Token';
  }
}

module.exports = { tokenize, untokenize };
