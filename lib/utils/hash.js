const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

function hash(string) {
  return bcrypt.hash(string, SALT_ROUNDS);
}

function compare(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hash,
  compare
};
