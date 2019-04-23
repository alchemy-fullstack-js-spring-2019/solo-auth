const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    User
      .create({
        email,
        password
      })
      .then(user => {
        const token = user.authToken();
        res.send({
          user, 
          token
        });
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
        console.log('USER:', user);
        if(!user) {
          console.log('IT WORKED');
          const error = new Error('Invalid Authentication');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ])
          .then(([user, result]) =>{
            if(!result) {
              const error = new Error('Invalid Authentication');
              error.status = 401;
              return next(error);
            } else {
              res.send({
                user, 
                token: user.authToken()
              });
            }
          });
      });
  });
