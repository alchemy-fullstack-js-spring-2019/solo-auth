const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

function hash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = hash;
