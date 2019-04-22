const jwt = require('jsonwebtoken');

const createToken = payload => {
  return jwt.sign({ payload }, 'secret');
};

module.exports = {
  createToken
};
