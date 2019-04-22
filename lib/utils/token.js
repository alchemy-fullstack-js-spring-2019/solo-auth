require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({
    payload: {
      _id: payload._id,
      email: payload.email
    }
  }, process.env.AUTH_SECRET, { expiresIn: '1d' });
};

module.exports = { tokenize };
