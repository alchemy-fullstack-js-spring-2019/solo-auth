const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

function hash(string) {
  return bcrypt.hash(string, SALT_ROUNDS);
}

module.exports = {
  hash
};
