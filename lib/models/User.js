const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
  //not required because when we first get the password from the user it will be the clear password and we will be the ones to hash it 
});

module.exports = mongoose.model('User', userSchema);
