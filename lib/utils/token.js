const jwt = require('jsonwebtoken');

const token = (payload, options) => {
  const secret = process.env.AUTH_SECRET;
  return jwt.sign(payload, secret, options);
};

module.exports = { token };
