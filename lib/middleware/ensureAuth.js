const User = require('../models/User');

const findAuthToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  //strip off Bearer (space) and attach to req.token
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User 
    .findByToken(req.token)
    .then(user => {
      if(!user) {
        const error = new Error('Token required');
        error.status = 401;
        return next(error);
      } else {
        req.user = user;
        next();
      }
    });
};

module.exports = {
  findAuthToken,
  ensureAuth
};
