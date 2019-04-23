const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
const { compare } = require('../../lib/utils/hash');


const usersSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String, 
    unique: true
  },
  passwordHash: String
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
  const result = compare(this.passwordHash, password);
  return result;
};

module.exports = mongoose.model('User', usersSchema);
