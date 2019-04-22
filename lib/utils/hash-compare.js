const bcrypt = require('bcryptjs');

module.exports = function hashCompare(password){
    const status = bcrypt.hash('password, 10') == bcrypt.hash(password, 10);
    return Promise.resolve(status);
};


