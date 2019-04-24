const { hash, compare } = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('returns a promise with a hashed password', () => {
    const password = 'Passw0rd';
    return hash(password)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual(password);
      });
  });

  it('compareshashed password with password and returns true', () => {
    const password = 'Passw0rd';
    return hash(password)
      .then(hashedPassword => compare(password, hashedPassword))
      .then(result => expect(result).toBeTruthy());
  });

  it('compares hashed password with wrong password and returns false', () => {
    const password = 'Passw0rd';
    return hash(password)
      .then(hashedPassword => compare('Passw0rd ', hashedPassword))
      .then(result => expect(result).toBeFalsy());
  });
});
