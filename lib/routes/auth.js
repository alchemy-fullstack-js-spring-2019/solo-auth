const { Router } = require('express');
const { tokenize } = require('../utils/token');
const User = require('../models/User');

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
  });
