const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /.+@.+\..+/,
    required: true
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
