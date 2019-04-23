const { Router } = require('express');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    res.send({ message: 'poop' });
  });
