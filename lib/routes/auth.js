const { Router } = require('express');
const { tokenize } = require('../utils/token');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User.create({ email, password })
      .then(user => {
        const token = tokenize(user);
        res.send({ user, token });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('No such email or password in system');
          error.status = 401;
          return next(error);
        } else {
          return user.compare(password)
            .then(result => {
              if(result) {
                const token = user.authToken();
                res.send({ user, token });
              } else {
                const error = new Error('No such email or password in system');
                error.status = 401;
                return next(error);
              }
            });
        }
      });
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
    next();
  });
