require('dotenv').config();
const jwt = require('jsonwebtoken');

const EXPIRATION_TIME = '1d';


const tokenize = payload => jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRATION_TIME });

const untokenize = (token) => {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET).payload;
  } catch(err) {
    throw 'Bogus Token';
  }
};

module.exports = { tokenize, untokenize };
