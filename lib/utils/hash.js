const bcrypt = require('bcryptjs');

function createHash(pw) {
  return bcrypt.hash(pw, 8);
}

function hashTrue(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}

module.exports = { createHash, hashTrue };
