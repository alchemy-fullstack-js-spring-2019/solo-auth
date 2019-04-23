const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String, 
    unique: true
  },
  passwordHash: String
});

module.exports = mongoose.model('User', usersSchema);
