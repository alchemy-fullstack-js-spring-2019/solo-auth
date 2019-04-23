const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /.+@.+\..+/,
    required: true,
    unique: true
  },
  passwordHash: String
}, {
  // Applies to when object is sent through res.send, rather than using select
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

userSchema.virtual('clearPassword').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      // delete this._tempPassword;
      next();
    });
});

userSchema.methods.compare = function(clearPassword) {
  return compare(clearPassword, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

module.exports = mongoose.model('User', userSchema);
