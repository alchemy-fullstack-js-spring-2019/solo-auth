const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('hash function', () => {
  it('takes a string and returns a promise that resolves with a hashed password', () => {
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
        expect(compareResult).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    const password = 'password';

    return hash(password)
      .then(hashedPassword => {
        return compare('password123', hashedPassword);
      })
      .then(compareResult => {
        expect(compareResult).toBeFalsy();
      });
  });
});
