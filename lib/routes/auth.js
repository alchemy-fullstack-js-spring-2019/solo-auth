const { Router } = require('express');
const User = require('../Model/User');

module.exports = Router()
    .post('/signup', (req, res, next)=>{
        console.log('signing up new user');
        const { email, password } = req.body;
        User
            .create({ email, password })
            .then((user)=>{
                console.log('user in test', user);
                const token = user.authToken();
                res.send({ user, token });
            })
            .catch(next);
    })
;
