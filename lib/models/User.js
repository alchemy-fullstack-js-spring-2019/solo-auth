const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
}, {
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

module.exports = mongoose.model('User', userSchema);
