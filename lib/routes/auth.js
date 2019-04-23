const { Router } = require('express');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    return User.create({ email, password })
      .then(user => {
        return Promise.all([
          Promise.resolve(user),
          user.authToken()
        ]);
      })
      .then(([user, token]) => {
        res.send({ user, token });
        next();
      });
  })

  .post('/signin', (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    User.findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid Authentication');
          error.status(401);
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ])
          .then(([user, result]) => {
            if(!result){
              const error = new Error('Invalid Authentication');
              error.status(401);
              return next(error);
            }
            res.send({ token: user.authToken(), user });
          });
      });
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });
