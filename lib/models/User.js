const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  hashedPassword: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.hashedPassword;
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(function(password) {
  return this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.hashedPassword = hashedPassword;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.hashedPassword);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};



const User = mongoose.model('User', userSchema);

module.exports = User;
