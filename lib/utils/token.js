const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload }, 'secretstring', { expiresIn: '24h' });
};

module.exports = tokenize;
