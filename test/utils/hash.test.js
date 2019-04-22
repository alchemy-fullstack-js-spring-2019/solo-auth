const bcrypt = require('bcryptjs');

describe('BCRYPTS', () => {
  it('hashes a password', () => {
    const password = 'dude';
    return bcrypt.hash(password, 10)
      .then(hashedp => {
        console.log(hashedp);
        expect(hashedp).toBeDefined();
      });
  });
});
