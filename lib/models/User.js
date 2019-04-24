const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
const { compare } = require('../../lib/utils/hash');
const { token, untokenize } = require('../../lib/utils/token');

const usersSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String, 
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

usersSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

usersSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

usersSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

usersSchema.methods.authToken = function() {
  return token(this.toJSON());
};

usersSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

module.exports = mongoose.model('User', usersSchema);
