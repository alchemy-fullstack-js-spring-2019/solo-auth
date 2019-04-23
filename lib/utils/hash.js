const bcrypt = require('bcryptjs');

const ROUNDS = 10;

const hash = password => {
  return bcrypt.hash(password, ROUNDS);
};

const compare = (password, hash) =>  {
  return bcrypt.compare(password, hash);
};

module.exports = {
  hash,
  compare
};
