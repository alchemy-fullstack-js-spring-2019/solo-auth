const jwt = require('jsonwebtoken');

const EXPIRES_IN = '1d';

const tokenize = payload => {
    return jwt.sign(
        { payload },
        process.env.AUTH_SECRET,
        { expiresIn: EXPIRES_IN });
};

const untokenize = token => {
    const secret = process.env.AUTH_SECRET;
    const reverse = jwt.verify(token, secret).payload;
    
    return reverse;
 
    // return the payload from the token
};

module.exports = {
    tokenize,
    untokenize
};
