const { hash, compare } = require('../../lib/utils/hash');

describe('testing hash and compare functions', () => {
  it('takes a string and returns a promise that resolves with a hashed password', () => {
    const password = 'secretPW';
    return hash(password)
      .then(hashedPW => {
        expect(hashedPW).toBeDefined();
        expect(hashedPW).not.toEqual(password);
      });
  });
  it('takes a string and compares hashed value to plain text', () => {
    const password = 'supersecretPW';
    return hash(password)
      .then(hashedPW => {
        return compare(password, hashedPW);
      })
      .then(compareBool => {
        expect(compareBool).toBeTruthy();
      });
  });
  it('takes a string and compares hashed value to plain text FAIL', () => {
    const password = 'supersecretPW';
    return hash(password)
      .then(hashedPW => {
        return compare('false', hashedPW);
      })
      .then(compareBool => {
        expect(compareBool).toBeFalsy();
      });
  });
});
