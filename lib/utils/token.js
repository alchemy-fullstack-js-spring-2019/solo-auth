const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '1h' });
};

const untokenize = token => {
  return jwt.verify(token, process.env.AUTH_SECRET).payload;
};

module.exports = {
  tokenize,
  untokenize
};

