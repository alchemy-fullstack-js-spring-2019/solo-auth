const mongoose = require('mongoose');
const { hash, compareHash } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
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


// password refers to key value being passed into new User
// this._temppassword - _tempPassword becomes the method to call
// passwordText is the value in the password key for the new User obj
UserSchema.virtual('password').set(function(passwordText) {
  return this._tempPassword = passwordText;
});

UserSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

UserSchema.methods.compare = function(plainTextPassword) {
  return compareHash(plainTextPassword, this.passwordHash);
};

UserSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

UserSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

module.exports = mongoose.model('User', UserSchema);


