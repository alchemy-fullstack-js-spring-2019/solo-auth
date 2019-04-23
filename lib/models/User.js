const mongoose = require('mongoose');


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

module.exports = mongoose.model('User', usersSchema);
