const User = require('../models/User');

module.exports = (req, res, next) => {
  return User
    .findByToken(req.token)
    .then(user => {
      if(!user) {
        const error = new Error('invalid token');
        error.status = 400;
        next(error);
      } else {
        req.user = user;
        next();
      }
    });
};
