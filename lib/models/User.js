const mongoose = require('mongoose');
// const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: false
  }
});

userSchema.virtual('password1').set(function(passwordtext) {
  this._tempPassword = passwordtext;
});

module.exports = mongoose.model('User', userSchema);
