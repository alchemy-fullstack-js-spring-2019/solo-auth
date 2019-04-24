const bcryptjs = require('bcryptjs');

module.exports = (password, hash) => {
  return bcryptjs.compare(password, hash);
};
