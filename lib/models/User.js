const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  passwordHash: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
