const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const compare = (plainText, hashedString) => {
  return bcrypt.compare(plainText, hashedString);
};

module.exports = {
  hash,
  compare
};
