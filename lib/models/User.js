const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /.+@.+\..+/,
    required: true,
    unique: true
  },
  passwordHash: String
});

userSchema.virtual('clearPassword').set(function(password) {
  this._tempPassword = password;
});

module.exports = mongoose.model('User', userSchema);
