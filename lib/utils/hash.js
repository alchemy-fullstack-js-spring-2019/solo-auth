const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const compare = (plainText, hashedString) => {
  return hashedString && bcrypt.hash(plainText, SALT_ROUNDS);
};

module.exports = {
  hash,
  compare
};
