const User = require('../../lib/models/User');



const ensureAuth = (req, res, next) => {
  return User
    .findByToken(req.token)
    .then(user => {
      req.user = user;
    });
};

module.exports = {
  ensureAuth,
};
