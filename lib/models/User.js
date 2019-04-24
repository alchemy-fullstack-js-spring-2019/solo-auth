const mongoose = require('mongoose');
const hash = require('../utils/hash');
const compare = require('../utils/compare');
const { tokenize, untokenize } = require('../utils/token');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String
    }
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.passwordHash;
            delete ret.__v;
        }
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

//this is useful when a user signs in
userSchema.methods.compare = function(password) {
    return compare(password, this.passwordHash);
};

//this is useful when a use signs in to track that user accross requests
userSchema.methods.authToken = function() {
    //use tokenize to create a token out of this.toJSON() (this.toJSON is the payload)
    //return the created token

    return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
    return Promise.resolve(untokenize(token));
};

const User = mongoose.model('User', userSchema);

module.exports = User;

