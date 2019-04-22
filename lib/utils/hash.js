const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

function hash(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function compareHash(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hash,
  compareHash
};
