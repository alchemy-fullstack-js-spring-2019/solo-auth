const mongoose = require('mongoose');
const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.hashedPassword = hashedPassword; 
      next();     
    });
});

userSchema.methods.banana = function() {
  return 'banana';
};

module.exports = mongoose.model('User', userSchema);
