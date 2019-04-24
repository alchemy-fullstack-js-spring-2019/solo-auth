const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');


// create your user model
// users have an email and non-required passwordHash field
// create another test it('has a required email', () => { }
// create a new user with const user = new User({});
// validate the user with const errors = user.validateSync().errors
// expect to get some errors
// HINT: console.log errors and see what it looks like

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
}, { toJSON: {          //doc: mongoose doc, ret: returned doc
  transform: function(doc, ret) {
    delete ret.passwordHash; // so doesn't respond to user with their password
    delete ret.__v;
  }
}
});

// Make a virtual "password" field in our userSchema with a setter
// HINT: userSchema.virtual('password).set(function(password) {})
// on setting the password field store the clear password in a temporary property
// HINT: this._tempPassword = password

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

// create a compare method on userSchema
// compare should be a function that takes a password (in clear text)
// compare should return true if the password matches this.passwordHash
// HINT: use the compare function we created earlier

userSchema.methods.compare = function(password){
  return compare(password, this.passwordHash);
};

// use tokenize from token.js to make token out of this.toJSON() 
// (this.toJSON()) is the payload)
// return the created token

userSchema.methods.authToken = function(password) {
  return tokenize(this.toJSON(password));
};

console.log(untokenize, compare);
const User = mongoose.model('User', userSchema);
module.exports = User;
