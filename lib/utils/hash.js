const bcrypt = require('bcryptjs');

function createHash(pw) {
  const saltRounds = 8;
  return bcrypt.hash(pw, saltRounds);
}

function hashTrue(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}

function createSaltHash(pw) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(pw, salt);
}

module.exports = { createHash, hashTrue, createSaltHash };
