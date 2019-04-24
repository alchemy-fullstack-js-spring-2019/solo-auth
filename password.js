


const bcrypt = require('bcryptjs');
//bcrypt - first two characters are version of bcrypt, then salt, then password hash


const password = 'password1234';

bcrypt.hash(password, 10) //factor of 10 is passed to .hash and represents time to create encryption. higher nuber = longer time.
  .then(console.log);
