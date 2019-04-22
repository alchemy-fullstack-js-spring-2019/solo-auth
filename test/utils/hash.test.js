const bcrypt = require('bcryptjs');

describe('bcrypt hash tests', () => {

  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        console.log(hashedPassword);
        expect(hashedPassword).toBeDefined();
      }); 
  });

});
