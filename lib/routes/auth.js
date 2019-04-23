const { Router } = require('express');
const User = require('../Model/User');

module.exports = Router()
    .post('/signup', (req, res, next)=>{
        const { email, password } = req.body;
        User
            .create({ email, password })
            .then((user)=>{
                const token = user.authToken;
                res.send(user, token);
            });
    })
;
