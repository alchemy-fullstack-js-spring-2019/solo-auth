const bcrypt = require('bcryptjs');

const hash = password => {
  return bcrypt.hash(password, 10);
};

const compare = (string, hash) => {
  return bcrypt.compare(string, hash);
};

module.exports = compare;

// const password = 'password123';

module.exports = {
  hash,
  compare
};


// const newPassword = bcrypt.hash(password, 10);
