const User = require('../../lib/models/User');

const bearerToken

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

}



module.exports = {
  ensureAuth
}