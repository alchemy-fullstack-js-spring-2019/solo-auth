const bcryptjs = require('bcryptjs');

function bcrypt(password) {
  return bcryptjs.hash(password, 10);
}

module.exports = bcrypt;
