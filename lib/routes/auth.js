const { Router } = require('express');
const User = require('../models/User');
const { createToken } = require('../utils/token');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => {
        const token = createToken(user);
        res.send({ user, token });
      })
      .catch(next);
  });
