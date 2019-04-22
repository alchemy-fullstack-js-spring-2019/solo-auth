const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '24h' });
};

const untokenize = token => {
  return jwt.verify(token, process.env.AUTH_SECRET);
};

module.exports = { tokenize, untokenize };
