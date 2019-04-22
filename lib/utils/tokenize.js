require('dotenv').config();
const jwt = require('jsonwebtoken');
const EXPIRES_IN = '1d';

function tokenize(obj){
  return jwt.sign(obj, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
}

function untokenize(token){
  return jwt.verify(token, process.env.AUTH_SECRET).payload;
};

module.exports = {
  tokenize,
  untokenize };
