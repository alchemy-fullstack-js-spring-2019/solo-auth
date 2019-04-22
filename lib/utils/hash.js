const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hash, compare };
