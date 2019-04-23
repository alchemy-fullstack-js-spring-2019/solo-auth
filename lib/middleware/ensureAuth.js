const User = require('../models/User');


const findAuthToken = (req, res, next) => {
  const token = req.get('Authorization') || '';
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  const token = req.token;
  return User
    .findByToken(token)
    .then(user => {
      if(!user){
        const error = new Error('Invalid token');
        error.status(400);
        return next(error);
      }
      req.user = user;
      next();
    });
};

module.exports = {
  findAuthToken,
  ensureAuth
};
