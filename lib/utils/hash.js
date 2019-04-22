const bcryptjs = require('bcryptjs');

const SALT_ROUNDS = 10;

module.exports = password => {
  return bcryptjs.hash(password, SALT_ROUNDS);
};
