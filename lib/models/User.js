const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  hashedPassword: String
});

userSchema.virtual('password').set(function(password) {
  return this._tempPassword = password;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
