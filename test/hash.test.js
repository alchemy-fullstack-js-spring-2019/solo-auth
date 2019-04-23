require('dotenv').config();
const { hash, compare } = require('../lib/utils/hash');
const User = require('../lib/models/User');
const mongoose = require('mongoose');

describe('hash test', () => {
  // beforeAll(() => {
  //     return mongoose.connect('mongodb://localhost')
  // })

  it('takes a string and returns a promise that resolves with a hashed password', () => {
    const password = 'password1234';
    return hash(password)
      .then(returnedHash => {
        expect(returnedHash).toEqual(expect.any(String));
        expect(returnedHash).not.toEqual(password);
      });
  });

  it('can compare two passwords', () => {
    const password = 'doopdeedoo';
    return hash(password)
      .then(hashedPassword => {
        return compare(password, hashedPassword);
      })
      .then(compareResults => {
        expect(compareResults).toBeTruthy();
      });
  });

  it('fails if passwords do not match', () => {
    const password = 'spicypassword';
    return hash(password)
      .then(hashedPassword => {
        return compare('wrongpassword', hashedPassword);
      })
      .then(compareResults => {
        expect(compareResults).toBeFalsy();
      });
  });
});
