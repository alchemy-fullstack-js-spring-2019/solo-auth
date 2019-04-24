const { hash, compare } = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return hash('alys234')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual('alys234');
      });
  });
  it('can compare passwords', () => {
    const pw = 'whatever';
    return hash(pw)
      .then(hashedPassword => {
        return compare('whatever', hashedPassword);
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });
  it('can compare bad passwords', () => {
    const pw = 'whatever';
    return hash(pw)
      .then(hashedPassword => {
        return compare('whatev', hashedPassword);
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });
});
