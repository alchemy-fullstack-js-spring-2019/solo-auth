const bcrypt = require('bcryptjs');

const password = 'password1234';

bcrypt.hash(password, 10) 
    .then(hashed => console.log(hashed));
