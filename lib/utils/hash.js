const bcrypt = require('bcryptjs');
// that takes a string and returns a promise that resolves
// with a hashed password.

const saltnum = 10;

const hash = password => {
  return bcrypt.hash(password, saltnum);
};

// create a compare function that takes a password string and hash and 
// returns a promise that resolves to true if the password matches the hash otherwise false.

const compare = password => {
  //expect(password).toEqual(hash);
  return bcrypt.compare(password, hash);
};

module.exports = { hash, compare };


