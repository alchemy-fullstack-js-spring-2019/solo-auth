const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
    unique: true
  }, 
  passwordHash: {
    type: String,
  }
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function() {

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
