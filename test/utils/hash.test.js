const bcryptjs = require('bcryptjs');
const hash = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('can compare hashes based on the same password', () => {
    const password = '1234Password';

    bcryptjs.hash(password, 10)
      .then(hashedPassword => {
        return bcryptjs.compare(password, hashedPassword);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('takes a password and returns a hashed password', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
      });
  });
});
