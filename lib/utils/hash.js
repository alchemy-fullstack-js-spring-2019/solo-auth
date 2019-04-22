const bcrypt = require('bcryptjs');

function hash(password){
    return Promise.resolve(bcrypt.hash(password, 10));
}


module.exports = hash;
