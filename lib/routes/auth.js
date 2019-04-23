const { Router } = require('express');
const User = require('../models/User');

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
  });
