const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10 
//this makes 10 not a 'magic number' where there are specific numbers in the code and no one knows why 

const hashFn = password => {
  return bcrypt.hash(password, SALT_ROUNDS)
};

const compare = (password, hashed) => {
  return bcrypt.compare(password, hashed);
  // return if(password === hashed);
}

module.exports = { hashFn, compare };
