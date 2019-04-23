const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  hashedPassword: String
});

userSchema.methods.compare = function(password) {
  return compare(password, this.hashedPassword);
};

// userSchema.methods.authToken = function() {

// };

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
const User = mongoose.model('User', userSchema);

module.exports = User;
