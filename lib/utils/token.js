const jwt = require('jsonwebtoken');

const token = (payload) => {
  const secret = process.env.AUTH_SECRET;
  return jwt.sign({ payload }, secret, { expiresIn: '2h' });
};

const untokenize = (token) => {
  return jwt.verify(token, process.env.AUTH_SECRET);
};

module.exports = { token, untokenize };
