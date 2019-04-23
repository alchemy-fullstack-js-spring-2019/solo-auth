const { Router } = require('express'),
  User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Authentication Error');
          error.status = 401;
          next(error);
        } else {
          user.compare(password)
            .then(result => {
              if(result) {
                res.send({ user, token: user.authToken() });
              } else {
                const error = new Error('Authentication Error');
                error.status = 401;
                next(error);
              }
            });
        }
      })
      .catch(next);
  });
