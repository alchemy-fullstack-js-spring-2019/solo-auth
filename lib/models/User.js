const mongoose = require('mongoose');
const { createHash } = require('../../lib/utils/hash');

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
    if(this._tempPassword === undefined) {
      return next();
    } else {
      this.passwordHash = createHash(this._tempPassword);
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
