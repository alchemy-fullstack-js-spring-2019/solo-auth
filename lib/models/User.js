require('dotenv').config();
const mongoose = require('mongoose');
const { hashFn, compare } = require('../utils/hash.js');
const { tokenize } = require('../utils/jwt.js');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
  //not required because when we first get the password from the user it will be the clear password and we will be the ones to hash it 
});

//SINCE THIS ISNT IN THE SCHEMA IT GETS CAUGHT HERE
//this will never get stored in the db but the dev will have access to it within this function 
userSchema.virtual('clearPassword').set(function(password) {
  //this function gets invoked whenever you create a user with a clear password
  this._tempPassword = password //temporarily store it here so we can access it in 'save'. cant hash it here because this is sychronous?
});

userSchema.pre('save', function(next) {
  //this function runs before you save the user to the database, hence .pre
  //that way the database has the hashed version rather than the clear password 
  //that means this function is considered middleware/a hook
  hashFn(this._tempPassword) //gotten from the .virtual, even though like 18 is local, since .this in both places refers to the same instance, userSchema
    .then(hashedPassword => {
      this.passwordHash = hashedPassword; //resetting line 10, now db has hashed version
      next(); //since it's middleware
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash)
};


userSchema.methods.authToken = function() {
  return tokenize(this.toJSON())
  //returns the token
};

module.exports = mongoose.model('User', userSchema);
