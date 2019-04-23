const User = require('../models/User');

const findAuthToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  //strip off Bearer (space) and attach to req.token
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = () => {
    
};

module.exports = {
  findAuthToken
};
