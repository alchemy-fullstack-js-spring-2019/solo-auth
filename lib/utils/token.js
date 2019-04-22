const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload: payload }, process.env.AUTH_SECRET, { expiresIn: '24h' });
};

module.exports = { tokenize };
