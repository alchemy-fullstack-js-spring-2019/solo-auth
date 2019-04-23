const mongoose = require('mongoose');
const hash = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
}, { toJSON: {          //doc: mongoose doc, ret: returned doc, last thing to happen
  transform: function(doc, ret) {
    delete ret.passwordHash; // so doesn't respond to user with their password
    delete ret.__v;
  }
}
});

// userSchema.methods.compare = function(password) {
//   //use compare from yesterday
//   //return true if good, false if not
// };

userSchema.authToken = function(password) {
  this.toJSON(password);
  const authToken = this.tokenize(password);
  return authToken;
  // use tokenize from token.js to make token out of this.toJSON() 
  // (this.toJSON()) is the payload)
  // return the created token
};

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
console.log(untokenize());

// create your user model
// users have an email and non-required passwordHash field
// create another test it('has a required email', () => { }
// create a new user with const user = new User({});
// validate the user with const errors = user.validateSync().errors
// expect to get some errors
// HINT: console.log errors and see what it looks like

// Make a virtual "password" field in our userSchema with a setter
// HINT: userSchema.virtual('password).set(function(password) {})
// on setting the password field store the clear password in a temporary property
// HINT: this._tempPassword = password

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

const User = mongoose.model('User', userSchema);
module.exports = User;

//5:31
