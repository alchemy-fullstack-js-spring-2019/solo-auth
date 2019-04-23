const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: String
});

userSchema.virtual


module.exports = mongoose.model('User', userSchema);
