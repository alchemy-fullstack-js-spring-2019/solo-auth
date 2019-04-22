const jwt = require('jsonwebtoken');

const token = (payload, secret) => {
  return jwt.sign(payload, secret);
};

module.exports = { token };
