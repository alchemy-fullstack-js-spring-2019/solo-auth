const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
  }
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._tempPassword = password;
  });
userSchema
  .pre('save', (next) => {
    const user = this;
    if(user._tempPassword === undefined) {
      return next();
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
