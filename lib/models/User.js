const mongoose = require('mongoose');
const hash = require('../utils/hash');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
});

userSchema.virtual('password').set(setTempPassword);

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

function setTempPassword(password) {
  this._tempPassword = password;
}

module.exports = mongoose.model('User', userSchema);
