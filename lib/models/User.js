const mongoose = require('mongoose');
const  { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
    unique: true
  }, 
  passwordHash: String
}, {
  toJSON: {                             //only happens when we do res.send(the model)
    transform: function(doc, ret) {     //doc is mongoose document
      delete ret.passwordHash;          //ret is the returned object(?)
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

//useful when user signs in
userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};


userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
  //promise is to make it like other statics methods
};

module.exports = mongoose.model('User', userSchema);
