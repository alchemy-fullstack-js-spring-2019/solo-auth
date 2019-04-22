const bcrypt = require('bcryptjs');
const { hash } = require('../../lib/utils/hash');

describe('hash function', () => {
  it('takes a string and returns a promise that resolves with a hashed password', () => {
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual('password');
      });
  });
});
