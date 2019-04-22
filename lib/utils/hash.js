const bcrypt = require('bcryptjs');

function passHash(password) {
  return bcrypt.hash(password, 10);
}


function passCompare(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
module.exports = { passHash, passCompare } ;
