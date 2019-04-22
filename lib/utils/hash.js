const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

function hash(string) {
  return bcrypt.hash(string, SALT_ROUNDS);
}

function compare(string, hashedString) {
  return bcrypt.compare(string, hashedString);
}

module.exports = {
  hash,
  compare
};
