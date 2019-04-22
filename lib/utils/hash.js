const bcrypt = require('bcryptjs');

function hash(password) {
  return bcrypt.hash(password, 10);
}

module.exports = hash;
