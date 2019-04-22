const { hash } = require('../lib/utils/hash');

describe('hash test', () => {
  it('takes a string and returns a promise that resolves with a hashed password', () => {
    const password = 'password1234';
    return hash(password)
      .then(returnedHash => {
        expect(returnedHash).toEqual(expect.any(String));
        expect(returnedHash).not.toEqual(password);
      });
  });
});
