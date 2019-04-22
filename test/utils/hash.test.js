const { hash, compareHash } = require('../../lib/utils/hash');

describe('hash', () => {
  it('hashes a password', () => {
    return hash('maddyGurl23')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual('maddyGurl23');
      });
  });

  it('can compare password', () => {
    return hash('maddyGurl23')
      .then(hashedPassword => {
        return compareHash('maddyGurl23', hashedPassword)
          .then(results => {
            expect(results).toBeTruthy();
          });
      });
  });
});
