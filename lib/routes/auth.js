const { Router } = require('express');
const User = require('../../lib/models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User.create({ email, password })
      .then(user => {
        const token = user.authtoken();
        res.send({ user, token });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    User.findOne({ email })
      .then(user => {
        if(user.compare(password)) { 
          res.send({ token: user.authtoken(), user });
        } else {
          const error = new Error('Invalid authentication');
          error.status = 401;
          next(error);
        }
      });

  })
  
;
