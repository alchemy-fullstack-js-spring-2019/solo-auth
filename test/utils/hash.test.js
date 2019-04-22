const hash = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('takes a password and returns a hashed password', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
      });
  });
});
