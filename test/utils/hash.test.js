const bcrypt = require('bcryptjs');
const { hash } = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('can hash a password', () => {
    const password = 'a password';
    return bcrypt.hash(password, 10)
      .then(hashedPassword => {
        return Promise.all([
          Promise.resolve(hashedPassword),
          bcrypt.hash(password, 10)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).not.toEqual(hash2);
      });
  });
});


