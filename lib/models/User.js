const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret._id;
      delete ret.__v;
    }
  }
});

userSchema.methods.compare = function(attempt) {
  return compare(attempt, this.passwordHash);
};

userSchema.methods.authToken = function() {
  const json = this.toJSON();
  return tokenize(json);
};

userSchema.virtual('password')
  .set(function(textPW) {
    this._tempPW = textPW;
  });

userSchema.pre('save', function(next) { 
  hash(this._tempPW)
    .then(hashedPW => {
      this.passwordHash = hashedPW;
      next();
    });
});

module.exports = mongoose.model('User', userSchema);
