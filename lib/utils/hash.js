const bcrypt = require('bcryptjs');

function passHash(password) {
  return bcrypt.hash(password, 10);
}

module.exports = passHash;
