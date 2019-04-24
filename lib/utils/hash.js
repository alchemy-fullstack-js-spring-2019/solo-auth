const bcrypt = require('bcryptjs');

function hash(password) {
  const salt = '$2b$10$ABCDEFGHIABCDEFGHI1234';
  return bcrypt.hash(password, salt);
}

function compare(password, hashed) {
  return bcrypt.compare(password, hashed);
}

module.exports = { hash, compare };
