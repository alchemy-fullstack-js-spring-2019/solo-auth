const { hash } = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return hash('alys234')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual('alys234');
      });
  });
});
