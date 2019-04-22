const jwt = require('jsonwebtoken');

const EXPIRES_IN = '1d'
const tokenize = payload => {
   const token = jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
  return token;
};

const untokenize = token => {
  const obj = jwt.verify(token, process.env.AUTH_SECRET);
  return obj.payload;
  //returns the payload from the token
}

module.exports = { tokenize, untokenize }
