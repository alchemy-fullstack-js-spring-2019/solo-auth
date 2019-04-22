const jwt = require('jsonwebtoken');

const tokenizer = payload => {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '24h' });
};

module.exports = { tokenizer };
