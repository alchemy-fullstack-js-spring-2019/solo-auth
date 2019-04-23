const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
const password = 'password';


const hash = password => {
  return  bcrypt.hash(password, SALT_ROUNDS);

}

const compare = (password, hash) => {
    return bcrypt.
}


module.exports = { hash };

