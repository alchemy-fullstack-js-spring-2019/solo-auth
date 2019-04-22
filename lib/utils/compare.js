const bcrypt =  require('bcryptjs');

function compare(password, inputHash) {
    return bcrypt.compare(password, inputHash);
}

module.exports = compare;
