const mongoose = require('mongoose');
const { bcrypt, compare } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String } }, {
  toJSON: {
    transform: function(doc, ret) {
      // delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.virtual('passwordVirtual').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next) {
  bcrypt(this._tempPassword)
    .then(hashedPass => {
      this.passwordHash = hashedPass;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};



module.exports = mongoose.model('User', userSchema);
