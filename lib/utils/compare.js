const hash = require('./hash');

function compare(password, inputHash) {
    return hash(password)
        .then(hashed => {
            return hashed === inputHash;
        });
}

module.exports = compare;
