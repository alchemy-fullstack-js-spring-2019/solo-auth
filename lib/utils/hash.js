const bcrypt = require('bcryptjs');

function hash(password) {
    return bcrypt.hash(password, 5);
}

module.exports = hash;
