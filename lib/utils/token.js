require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload }, 
    process.env.AUTH_SECRET, 
    { expiresIn: '1d' }
  );
};

const untokenize = token => {
  return jwt.verify(token,
    process.env.AUTH_SECRET, 
    { expiresIn: '1d' }
  ).payload;
};

module.exports = { tokenize, untokenize };
