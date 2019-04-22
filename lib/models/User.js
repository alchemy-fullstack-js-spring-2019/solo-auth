const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
