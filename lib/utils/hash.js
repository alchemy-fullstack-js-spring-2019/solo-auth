const bcrypt = require('bcryptjs');

function createHash(pw) {
  return bcrypt.hash(pw, 8);
}

function hashTrue(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}

function createSaltHash(pw) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(pw, salt);
}

module.exports = { createHash, hashTrue, createSaltHash };
