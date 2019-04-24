const User = require('../models/User');

const findAuthToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  console.log('authheader', authHeader);
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  console.log(req.token);
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
