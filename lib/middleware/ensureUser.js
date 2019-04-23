const User = require('../models/User');

function setAuthToken(req, res, next) {
  const token = req.get('Authorization').replace('Bearer ', '');
  req.token = token;
  next();
}

function ensureAuth(req, res, next) {
  return User.findByToken(req.token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
}

module.exports = {
  setAuthToken,
  ensureAuth
};
