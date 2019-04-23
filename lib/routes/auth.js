const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    User
      .create({ email, password })
      .then(user => {
        const token = user.authToken();
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
          const error = new Error('Invalid Authentication');
          error.status = 401;
          return next(error);
        }
        
        return Promise.all([
          user,
          user.compare(password)
        ]);
      })
      .then(([user, success]) => {
        if(success) {
          res.send({ user, token: user.authToken() });
        } else {
          const error = new Error('Invalid Authentication');
          error.status = 401;
          next(error);
        }
      })
      .catch(next);
  });

  

