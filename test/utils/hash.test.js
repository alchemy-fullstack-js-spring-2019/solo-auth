const bcryptjs = require('bcryptjs');

describe('bcrypt', () => {
  it('can compare hashes based on the same password', () => {
    const password = '1234Password';

    bcryptjs.hash(password, 10)
      .then(hashedPassword => {
        return bcryptjs.compare(password, hashedPassword)
      })
      .then(result => {
        expect(result).toBeTruthy();
      })
  });
});
