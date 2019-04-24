const { Router } = require('express');
const User = require('../../lib/models/User');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User.create({ email, password })
      .then(user => {
        const token = user.authtoken();
        res.send({ user, token });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User.findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, result]) => {
        if(!result) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          next(error);
        } else {
          res.send({ token: user.authtoken(), user });
        }
      });
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  })
  
;
