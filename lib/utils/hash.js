const bcrypt = require('bcryptjs');

const hash = password => {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(password, SALT_ROUNDS);
};



module.exports = {
  hash
};
