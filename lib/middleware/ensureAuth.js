// const User = require('../models/User');

// //authorization header that includes the token and the word bearer
// //Key: 'authorization' Value: 'Bearer {token}'

// const bearerToken = (req, res, next) => {
//     const headerValue = req.getHeader('Authorization') || '';  //sets to empty string if they pass nothing
//     //want just the token, so need to strip it (replace "bearer " part with an empty string using regex)
//     const token = headerValue.replace(/Bearer\s/i, ''); 

//     req.token = token;
//     new();
// };

// const ensureAuth = (req, res, next) => {
//     return User
//         .findByToken(req.token)
//         .then(user => {
//             if(!user) {
//                 const error = new Error('Invalid token');
//                 error.status = 400;
//                 return next(error);
//             }

//             req.user = user;
//             next();
//         });
// };

// module.exports = {
//     bearerToken,
//     ensureAuth
// };
