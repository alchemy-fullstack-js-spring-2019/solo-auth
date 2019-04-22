const bcryptjs = require('bcryptjs');

module.exports = password => {
  return bcryptjs.hash(password, 10);
};
