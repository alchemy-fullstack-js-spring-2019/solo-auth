const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
// not sure why the line above is included... it is linting but this matches Ryan's file exactly...
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
});

module.exports = mongoose.model('User', userSchema);
