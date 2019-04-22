const bcryptjs = require('bcryptjs');
const { bcrypt, compare } = require('../../lib/utils/hash');

describe('HASH', () => {
  it('hashes a pw using bcrypt', () => {
    const password = 'mypass';
    return bcryptjs.hash(password, 10)
      .then((hash) => {
        return Promise.all([
          hash,
          bcrypt(password)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash2).not.toEqual(hash1);
      });
  });


  // FIX
  it('compares passwords', () => {
    const password = 'password';
    const newPassword = 'flyingfox';

    return compare(password, newPassword)
      .then(passwords => {
        console.log(passwords);
        expect(passwords).toBeFalsy();
      });
  });

});
