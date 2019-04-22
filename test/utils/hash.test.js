const hash = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('returns a promise with a hashed password', () => {
    const password = 'Passw0rd';
    return hash(password)
      .then(hashedPassword => Promise.all([
        Promise.resolve(hashedPassword),
        hash(password)
      ]))
      .then(([hash1, hash2]) => {
        expect(hash1).toBeDefined();
        expect(hash2).toEqual(hash1);
        expect(hash1).not.toEqual(password);
      });
  });
});
