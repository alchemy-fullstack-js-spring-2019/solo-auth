const jwt = require('jsonwebtoken');


const createToken = payload => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET);
};

module.exports = {
  createToken
};
