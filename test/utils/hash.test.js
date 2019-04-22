const { hash, compareHash } = require('../../lib/utils/hash');


describe('bcrypt', () => {
  it('hashes a password', () => {
    const password = 'password';
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual(password);
      });
  });

  it('can compare passwords (TRUE)', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        return compareHash(password, hashedPassword);
      })
      .then(evaluation => {
        expect(evaluation).toBeTruthy();
      });
  });

  it('can compare passwords (FALSE)', () => {
    const password = 'password';
    const badPassword = 'badPassword'
    return hash(password)
      .then(hashedPassword => {
        return compareHash(badPassword, hashedPassword);
      })
      .then(evaluation => {
        expect(evaluation).toBeFalsy();
      });
  });
});
