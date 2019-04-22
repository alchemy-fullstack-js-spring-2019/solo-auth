require('dotenv').config();
const jwt = require('jsonwebtoken');

const EXPIRATION_TIME = '1d';


const tokenize = payload => jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRATION_TIME });

const untokenize = (token, secret) => jwt.verify(token, secret).payload;

module.exports = { tokenize, untokenize };
