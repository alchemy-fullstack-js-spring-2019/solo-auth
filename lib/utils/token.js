//grabs auth secret
const jwt = require('jsonwebtoken');

function tokenize(payload) {
    return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '24h' });
}

function untokenize(token) {
    const obj = jwt.verify(token, process.env.AUTH_SECRET);
    return obj.payload;
}

module.exports = { tokenize, untokenize };
