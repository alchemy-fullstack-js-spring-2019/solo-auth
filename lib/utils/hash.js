const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const compare = (p1, p2) => {
  return bcrypt.compare(p1, p2);
};

module.exports = { hash, compare };
