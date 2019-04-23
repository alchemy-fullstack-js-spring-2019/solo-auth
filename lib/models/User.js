require('dotenv').config();
const mongoose = require('mongoose');
const hash = require('../utils/hash');
const compare = require('../utils/compare');
const { createToken, verifyToken } = require('../utils/token');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(setTempPassword);

userSchema.pre('save', saveHash);

userSchema.methods.comparePw = function(password) {
  return compare(password, this.passwordHash);
}; 

userSchema.methods.createAuthToken = function() {
  const userPayload = this.toJSON();
  return createToken(userPayload);
};

userSchema.statics.findByToken = token => {
  return Promise.resolve(verifyToken(token));
};

function saveHash(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
}

function setTempPassword(password) {
  this._tempPassword = password;
}

module.exports = mongoose.model('User', userSchema);
