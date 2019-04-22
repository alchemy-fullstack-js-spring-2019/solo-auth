const bcryptjs = require('bcryptjs');
const bcrypt = require('../../lib/utils/hash');

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
});
