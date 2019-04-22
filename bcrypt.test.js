const bcrypt = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a pw', () => {
    const pw = 'password321';
    bcrypt.hash(pw, 10)
      .then(hashedPw => {
        return Promise.all([
          Promise.resolve(hashedPw),
          bcrypt.hash(pw, 10)
        ])
          .then(([hash1, hash2]) => {
            expect(hash1).not.toEqual(hash2);
          });
      });
  });


});
