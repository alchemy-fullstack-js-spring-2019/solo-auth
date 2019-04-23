const { Router } = require('express');
const User = require('../../lib/models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User.create({ email, password })
      .then(user => 
        Promise.all([
          user.authToken(),
          user
        ]))
      .then(([token, user]) => res.send(user, token))
      .catch(next);
  })
  
;
