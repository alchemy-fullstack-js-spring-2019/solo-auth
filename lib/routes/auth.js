const { Router } = require('express');
const User = require('../models/User');
const { createToken } = require('../utils/token');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => {
        const token = createToken(user);
        res.send({ user, token });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid Auth');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          user.comparePw(password),
          Promise.resolve(user)
        ]);
      })
      .then(([result, user]) => {
        if(!result) {
          const error = new Error('Invalid Auth');
          error.status = 401;
          return next(error);
        }
        const token = createToken(user);
        res.send({ user, token });
      })
      .catch(next);
  });
