const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../../lib/utils/hash');

describe('hash function', () => {
  it('takes a string and returns a promise', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        return Promise.all([
          Promise.resolve(hashedPassword),
          bcrypt.hash(password, 10)
        ]);
      })
      .then(([hash, newHash]) => {
        expect(hash).not.toEqual(newHash);
      });
  });
});

describe('compare function', () => {
  it('takes a string and hash and gives boolean comparison', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        return compare('password', hashedPassword);
      })
      .then(compared => {
        expect(compared).toBeTruthy();
      });
  });
});

