const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/tokenize');

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

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

// this is useful when a user signs in
userSchema.methods.compare = function(password) {
  // use compare from hash.js to compare password and this.passwordHash
  return compare(password, this.passwordHash);
  // return a promise that resolves with true if good
  // return a promise that resolves with false if bad
};

// this is useful when a user signs in to
// track that user across requests
userSchema.methods.authToken = function() {
  // use tokenize from token.js to create a token out of this.toJSON() (this.toJSON() is the payload)
  return tokenize(this.toJSON());
  // return the created token
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

module.exports = mongoose.model('User', userSchema);
