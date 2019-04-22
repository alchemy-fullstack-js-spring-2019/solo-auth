const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenize = payload => {
  return jwt.sign(
    { payload }, 
    process.env.AUTH_SECRET, 
    { expiresIn: '24h' }
  );
};

const untokenize = token => {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET).payload;
  } catch(err) {
    throw 'Bogus Token';
  }
};

module.exports = { tokenize, untokenize };
