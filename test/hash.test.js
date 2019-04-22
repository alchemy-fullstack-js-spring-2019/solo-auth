const bcrypt = require('bcryptjs');
const hashFn = require('../lib/utils/hash.js');

describe('hashing', () => {
  it('uses the hash function to take a regular string password and return its hashed version', () => {
    const password = 'passwordooeeoo'
      hashFn(password)
        .then(hashedPwd => {
          expect(password).not.toEqual(hashedPwd)
        })
  });
  it('hashes a password twice, the first hashed password and second hashed password arent equal, showing that each hash round changes the password', () => {
    const password = 'hackme';
    hashFn(password)
      .then(hashedPwd => {
        return Promise.all([
          Promise.resolve(hashedPwd),
          hashFn(hashedPwd)
        ])
      })
      .then(([hashed, hashedHashed]) => {
        expect(hashed).not.toEqual(hashedHashed)
      })
  })
});
