const bcrypt = require('bcryptjs');

const password = 'password';

bcrypt.hash(password, 2)
  .then(console.log);
