const jwt = require('jsonwebtoken');

const token = (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};

module.exports = { token };
