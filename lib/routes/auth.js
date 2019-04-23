const { Router } = require('express');

module.exports = Router()
    .post('/signupt', (req, res, next)=>{
        const { email, password } = req.body;
    })
;
