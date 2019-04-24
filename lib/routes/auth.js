const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User
      .findOne({ email })
      .then(user => {
        if(user) {
          const error = new Error('Email already in use');
          return next(error);
        } else {
          User
            .create({ email, password })
            .then(user => {
              const token = user.authToken();
              res.send({ user, token });
            })
            .catch(next);
        }
      });
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
          const error =  new Error('Invalid Authentication');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          user,
          user.compare(password)
        ]);
      })
      .then(([user, results]) => {
        if(!results) {
          const error =  new Error('Invalid Authentication');
          error.status = 401;
          next(error);
        } else {
          res.send({ token: user.authToken(), user });
        }

      });
  })
  
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });

