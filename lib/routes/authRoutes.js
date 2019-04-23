const User = require('../models/User.js');
const { Router } = require('express');

module.exports = Router()
.post('/signup', (req, res, next) => {
  const {
    email,
    password
  } = req.body
  User
    .create({ email, clearPassword:password })
    .then(user => {
      const token = user.authToken();
      res.send({ user, token }); //why not just send back the token??
    })
    .catch(next);
});
