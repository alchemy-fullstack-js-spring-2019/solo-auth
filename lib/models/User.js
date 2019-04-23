const mongoose = require('mongoose');
const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }
});

userSchema.virtual('passwordVirtual').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPass => {
      this.password = hashedPass;
      next();
    });
});

module.exports = mongoose.model('User', userSchema);
