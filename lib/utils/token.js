require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenize = payload => jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '24h' });

const untokenize = (token, secret) => jwt.verify(token, secret, { expiresIn: '24h' });

module.exports = { tokenize, untokenize };
