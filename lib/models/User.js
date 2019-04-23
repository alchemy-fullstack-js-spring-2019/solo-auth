const mongoose = require('mongoose');
const hash = require('../utils/hash');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String
    }
});

userSchema.virtual('password').set(function(passwordText) {
    this._tempPassword = passwordText;
});

userSchema.pre('save', function(next) {
    hash(this._tempPassword)
        .then(hashed => {
            this.passwordHash = hashed;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
