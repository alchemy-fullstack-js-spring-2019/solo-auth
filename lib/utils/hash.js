const bcrypt = require('bcryptjs');

const hash = password => {
  
};


const password = 'password123';

const newPassword = bcrypt.hash(password, 10);
