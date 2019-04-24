const { Router } = require('express');
const User = require('../Model/User');

module.exports = Router()
    .post('/signup', (req, res, next)=>{
     
        const { email, password } = req.body;
        User
            .create({ email, password })
            .then((user)=>{
             
                const token = user.authToken();
                res.send({ user, token });
            })
            .catch(next);
    })
    .post('/signin', (req, res, next) => 
    {
        const { email, password } = req.body;
        User
            .findOne({ email })
            .then(user=>{
                if(!user){
                    const error = new Error('Invalid auth');
                    error.satus = 401;
                    next(error);
                }
                else if(user.compare(password)){
                    const token = user.authToken();
                    res.send({ user, token });
                }
                else {
                    const error = new Error('Invalid auth');
                    error.satus = 401;
                    next(error);
                }
            });
    }
    );

    

