const jwt = require('jsonwebtoken');

// takes a payload and returns a token
// use jwt.sign to create a token that expires in 24 hours
// NOTE: user process.env.AUTH_SECRET as your secret
const expireIn = '1d';
const tokenize = payload => {
  return jwt.sign(
    { payload },
    process.env.AUTH_SECRET,
    { expiresIn: expireIn });
};

const untokenize = token => {
  try { 
    let ify = jwt.verify(token, process.env.AUTH_SECRET).payload;
    return ify;
  } catch(err) {
    throw 'Bogus Token';
  }
};


module.exports = {
  tokenize,
  untokenize
};
