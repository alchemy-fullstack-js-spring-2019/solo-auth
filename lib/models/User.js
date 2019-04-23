const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String } }, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next) {
  console.log(this._tempPassword);
  hash(this._tempPassword)
    .then(hashedPass => {
      this.passwordHash = hashedPass;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};



module.exports = mongoose.model('User', userSchema);
