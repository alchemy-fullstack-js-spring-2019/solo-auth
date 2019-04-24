const User = require('../../lib/models/User');

const bearerToken = (req, res, next) => {
  const headerValue = req.get('Authorization') || '';
  const token = headerValue.replace(/Bearer\s/i, '');

  req.token = token; 
  next();
};

const ensureAuth = (req, res, next) => {
  return User
    .findByToken(req.token)
    .then(user => {
      if(!user) {
        const error = new Error('Bogus Token');
        error.status = 400;
        return next(error);
      }
      req.user = user;
      next();
    });

};



module.exports = {
  bearerToken,
  ensureAuth
};
