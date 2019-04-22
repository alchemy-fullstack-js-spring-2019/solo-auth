const bcrypt = require('bcryptjs');

const hash = password => {
  return bcrypt.hash(password, 10);
};


module.exports = { hash };
