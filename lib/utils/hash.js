const bcrypt = require('bcryptjs');

function hash(pass) {
  return bcrypt.hash(pass, 2);
}

function saltHash(pass, salt) {
  return bcrypt.hash(pass, salt);
}

function compare(password, hash){
  return bcrypt.compare(password, hash);
}
module.exports = {
  hash,
  saltHash,
  compare
};



