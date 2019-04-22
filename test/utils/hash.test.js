const bcrypt = require('bcryptjs');

describe('bcrypt hash tests', () => {

  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        // eslint-disable-next-line no-console
        console.log(hashedPassword);
        expect(hashedPassword).toBeDefined();
      }); 
  });

});

it('creates hashed passwords that are different', () => {
  return bcrypt.hash('bonnie', 10)
    .then(hashed => {
      return Promise.all([
        hashed,
        bcrypt.hash('bonnie', 10)
      ])
        .then(([pw1, pw2]) => {
          expect(pw1).not.toEqual(pw2);
        });
    });
});
