const mongoose = require('mongoose');
const { hash, compare } = require('../../lib/utils/hash');
const { tokenizer, untokenizer } = require('../../lib/utils/token');

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
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash,
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});


userSchema.methods.compare = function(passwordText) {
  return compare(passwordText, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenizer(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenizer(token));
};

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

const User = mongoose.model('User', userSchema);

// const person = new User({ email: 'lies@lies.com', passwordHash: 'password' });

module.exports = User;
