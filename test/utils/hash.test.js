const bcrypt = require('bcryptjs');
const { hash } = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual('password');
      });
  });

  it('can compare passwords', () => {
    const password = 'password';

    return hash(password)
      .then(hashedPassword => {
        return bcrypt.compare('password', hashedPassword);
      })
      .then(compareResult => {
        expect(compareResult).toBeFalsy();
      });
  });
});
