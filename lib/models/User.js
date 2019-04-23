const mongoose = require('mongoose');
const { createHash, compare } = require('../../lib/utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: String
}, {
  toJSON: { //makes JSON doc is mongoose doc, return is stuff we get back
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._tempPassword = password;
  });
userSchema
  .pre('save', function(next) {
    if(this._tempPassword === undefined) {
      return next();
    } else {
      this.passwordHash = createHash(this._tempPassword);
      next();
    }
  });

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.authtoken = function() {
  return tokenize(this.toJSON);
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};


const User = mongoose.model('User', userSchema);
module.exports = User;
