const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /.+@.+\..+/,
    required: true
  },
  passwordHash: {
    type: String
  }
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

module.exports = mongoose.model('User', userSchema);
