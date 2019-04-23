const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  },
  _tempPassword: {
    type: String
  }
});

userSchema.virtual('password').set(setTempPassword);

function setTempPassword(password) {
  this._tempPassword = password;
}

module.exports = mongoose.model('User', userSchema);
