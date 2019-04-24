const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      pw
    } = req.body;
    User
      .create({ email, pw })
      .then(user => {
        const token = user.authToken();
        res.send({ user, token });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const {
      email,
      pw
    } = req.body;

    return User
      .findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(pw)
        ]);
      })
      .then(([user, result]) => {
        if(!result) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          next(error);
        } else {
          res.send({ token: user.authToken(), user });
        }
      });
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });
