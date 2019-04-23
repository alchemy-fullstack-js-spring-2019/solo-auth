const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const userSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
});


userSchema.virtual('password').set(function(passswordText) {
  this._tempPassword = passswordText;
}); 

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
}

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

module.exports = mongoose.model('User', userSchema);
