const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: false
  }
}
, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
}
);

userSchema.virtual('password').set(function(passwordtext) {
  this._tempPassword = passwordtext;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedP => {
      this.passwordHash = hashedP;
      next();
    });
});

userSchema.methods.compare = function(p1) {
  return compare(p1, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

// userSchema.methods.something = function(n) {
//   return `something${n}`;
// };


// userSchema.statics.words = function() {
//   return 'words';
// };

module.exports = mongoose.model('User', userSchema);
