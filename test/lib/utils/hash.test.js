const bcrypt = require('bcryptjs');

describe('hash function', () => {
  it('takes a string and returns a promise', () => {
    const password = 'password';
    return bcrypt.hash(password, 10)
      .then(hashedPassword => {
        return Promise.resolve(hashedPassword);
      })
      .then(hash1 => {
        expect(hash1).toBe(expect.any(String));
      });

  });
});
