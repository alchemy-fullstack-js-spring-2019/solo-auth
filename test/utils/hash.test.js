const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('hashing functions', () => {

  it('hashes a password', async() => {
    const hashedPassword = await hash('password');
    expect(hashedPassword).toEqual(expect.any(String));
    expect(hashedPassword).not.toEqual('password');
  });
  it('has a password async', async() => {
    const hashedPw = await hash('password');
    expect(hashedPw).toEqual(expect.any(String));
    expect(hashedPw).not.toEqual('password');
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
        return compare('password1234', hashedPassword);
      })
      .then(compareResult => {
        expect(compareResult).toBeFalsy();
      });
  });
});
