const jwt = require('jsonwebtoken');

const tokenizer = payload => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '24h' });
};

const untokenizer = token => {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET).payload;
  } catch(err) {
    throw 'Bogus Token';
  }
};

module.exports = { tokenizer, untokenizer };
