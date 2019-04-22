const bcrypt = require('bcryptjs');

function hash(password) {
  const salt = '$2b$10$ABCDEFGHIABCDEFGHI1234';
  return bcrypt.hash(password, salt);
}

// function compare(password, hashed) {
//   return Promise.all([
//     hash(password),
//     Promise.resolve(hashed)
//   ])
//     .then(([hashedPassword, hashed]) => {
//       if(hashedPassword === hashed) return true;
//       else return false;
//     });
// }

function compare(password, hashed) {
  return bcrypt.compare(password, hashed);
}

module.exports = { hash, compare };
