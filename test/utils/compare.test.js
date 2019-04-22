const compare = require('../../lib/utils/compare');
const hash = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('takes a password and hash and returns true if a password matches', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        return compare(password, hashedPassword);
      })
      .then(result => {
        expect(result).toBe(true);
      });
  });
});
