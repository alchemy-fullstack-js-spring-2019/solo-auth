const User = require('../models/User');

module.exports = (req, res, next) => {
    return User
        .findByToken(req.token)
        .then(user => {
            req.user = user;
            next();
        });
};
