const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: String
});

userSchema.methods.compare = function(attempt) {
  return compare(attempt, this.passwordHash);
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
