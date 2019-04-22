const hash = require('../../lib/utils/hash');

describe('testing hash function', () => {
  it('takes a string and returns a promise that resolves with a hashed password', () => {
    const password = 'secretPW';
    return hash(password)
      .then(hashedPW => {
        expect(hashedPW).toBeDefined();
        expect(hashedPW).not.toEqual(password);
      });
  });
});
