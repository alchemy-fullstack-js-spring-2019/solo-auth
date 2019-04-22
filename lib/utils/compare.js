const bcrypt = require('bcryptjs');

function hash(password){
    const hash = bcrypt.hash('password', 10);
    return Promise.resolve(bcrypt.hash(password, 10));
}


module.exports = hash;
