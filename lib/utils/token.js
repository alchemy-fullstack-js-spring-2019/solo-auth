const jwt = require('jsonwebtoken');
require('dotenv').config(); 

function tokenize(payload) {
  const token = jwt.sign({ 'payload': payload }, process.env.AUTH_SECRET, { expiresIn: '1d' });
  return token;
}

module.exports = {
  tokenize
};
