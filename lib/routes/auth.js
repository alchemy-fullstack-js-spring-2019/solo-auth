const { Router } = require('express'),
  { ensureAuth } = require('../middleware/ensureUser'),
  User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })

  .post('/signin', async(req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if(!user || !await user.compare(password)) {
        const error = new Error('Authentication Error');
        error.status = 401;
        next(error);    
      } else {
        res.send({ user, token: user.authToken() });
      }
    } catch(err) {
      next(err); 
    }
  })

  // eslint-disable-next-line no-unused-vars
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });
