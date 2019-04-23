const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash'); 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: false
  }
});

userSchema
  .virtual('password')
  .set(function(password){
    this._tempPassword = password;
  });

userSchema
  .pre('save', function(next) {
    const toHash = this._tempPassword;
    const hashedPass = hash(toHash);
    this.passwordHash = hashedPass;
    next();
  });

module.exports = mongoose.model('User', userSchema);
