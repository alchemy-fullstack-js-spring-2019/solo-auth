const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenize = payload => {
  return jwt.sign(
    { payload }, 
    process.env.AUTH_SECRET, 
    { expiresIn: '24h' }
  );
};


module.exports = { tokenize };
