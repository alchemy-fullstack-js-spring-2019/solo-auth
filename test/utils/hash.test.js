const bcrypt = require('bcryptjs');

describe('bcrypt hash tests', () => {

  it('hashes a password', () => {
    const hashedPassword = bcrypt.hash('password', 10);
    expect(hashedPassword).toBeDefined();
    console.log(hashedPassword);
  });

});
