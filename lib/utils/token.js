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
  const verified = jwt.verify(token, process.env.AUTH_SECRET)
  return verified.payload;
};

module.exports = { tokenize, untokenize };
