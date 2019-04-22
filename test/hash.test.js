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
});
