const { hashFn, compare } = require('../lib/utils/hash.js');

describe('hashing', () => {
  it('uses the hash function to take a regular string password and return its hashed version', () => {
    const password = 'passwordooeeoo'
      return hashFn(password)
        .then(hashedPwd => {
          expect(hashedPwd).toEqual(expect.any(String))
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
      });
  });
  it('compares a string password and its hashed version and returns true since they are the same', () => {
    const password = 'hackme';
    hashFn(password)
      .then(hashedPwd => {
        compare('hackme', hashedPwd)
        .then(boolean => {
          expect(boolean).toBeTruthy;
        });
      });
  });
});

