const mongoose = require('mongoose');
const { passHash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  }
});

//the 'password' after virtual must match the key that is set when the user is created.
userSchema.virtual('password').set(function(password){
  this._tempPassword = password;
});

userSchema.pre('save', function(next){
  passHash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
