const jwt = require('jsonwebtoken');

const EXPIRES_IN = '1d';

const tokenize = payload => {
    return jwt.sign(
        { payload },
        process.env.AUTH_SECRET,
        { expiresIn: EXPIRES_IN });
};


const untokenize = token => {
    console.log('token in untokenize', token);
    console.log('untokenizing');
    try {
        return jwt.verify(token, process.env.AUTH_SECRET).payload;
    } catch(err) {
        throw 'Bogus Token';
    }
};

module.exports = {
    tokenize,
    untokenize
};
