const mongoose = require('mongoose');
const { hash, compareHash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
});

userSchema.virtual('password').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

userSchema.methods.banana = function() {
  return 'banana';
};

module.exports = mongoose.model('User', userSchema);
