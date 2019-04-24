const User = require('../models/User.js');
const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth.js');

module.exports = Router()
.post('/signup', (req, res, next) => {
  const {
    email,
    password
  } = req.body
  User
    .create({ email, clearPassword:password })
    .then(user => {
      const token = user.authToken();
      res.send({ user, token }); //why not just send back the token??
    })
    .catch(next);
})
.post('/signin', (req, res, next) => {
  const {
    email,
    clearPassword
  } = req.body
    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(clearPassword)
        ]);
      })
      .then(([user, authResult]) => {
        if(!authResult) {
          const error = new Error('Invalid authentication')
          error.status = 401;
          next(error);
        }
        else {
          res.send({ 
          token: user.authToken(),
          user
         });
        }
      });
})
//just to check a token 
.get('/verify', ensureAuth, (req, res, next) => {
  res.send(req.user);
});
