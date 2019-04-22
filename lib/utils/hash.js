const bcryptjs = require('bcryptjs');

const ROUNDS = 10;

const bcrypt = password => bcryptjs.hash(password, ROUNDS);

const compare = (password, hash) =>  bcrypt.compare(password, hash);

module.exports = {
  bcrypt,
  compare
};
