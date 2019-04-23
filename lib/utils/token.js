const jwt = require('jsonwebtoken');
require('dotenv').config();

// takes a payload and returns a token
// use jwt.sign to create a token that expires in 24 hours
// NOTE: user process.env.AUTH_SECRET as your secret
const expiresIn = '1d';
const tokenize = payload => {
  return jwt.sign(
    { payload },
    process.env.AUTH_SECRET,
    { expiresIn: expiresIn });
};

const untokenize = token => {
  let ify = jwt.verify(token, process.env.AUTH_SECRET).payload;
  return ify;
};

module.exports = {
  tokenize,
  untokenize
};
