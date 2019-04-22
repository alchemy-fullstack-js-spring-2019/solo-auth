const bcrypt = require('bcryptjs');

module.exports = function hashCompare(password, hash){
    return bcrypt.compare(password, hash);
 
};


