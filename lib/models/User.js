const mongoose = require('mongoose');
const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
// }, {
//   toJSON: {
//     transform: function(doc, ret) {
//       delete ret.passwordHash;
//       delete ret.__v;
//     }
//   }
// }
});

userSchema.virtual('pw').set(function(pwText) {
  this._tempPassword = pwText;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPw => {
      this.passwordHash = hashedPw;
      next();
    });
});
module.exports = mongoose.model('User', userSchema);
