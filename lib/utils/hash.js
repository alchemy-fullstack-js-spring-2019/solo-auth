const bcrypt = require('bcryptjs');

const hash = password => {
  return bcrypt.hash(password, 10);
};

const compare = (hashedPassword, password) => {
  return bcrypt.compare(hashedPassword, password);
};

module.exports = { hash, compare };
