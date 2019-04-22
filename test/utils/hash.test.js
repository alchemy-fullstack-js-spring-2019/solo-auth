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
  
  it('2 hashed passwords not equal', () => {
    const password = 'dude';
    return bcrypt.hash(password, 10)
      .then(hashedp => {
        return Promise.all([
          Promise.resolve(hashedp),
          bcrypt.hash(password, 10)
        ]);
      })
      .then(([hash1, hash2]) => {
        console.log('test2\n', hash1, '\n', hash2);
        expect(hash1).not.toEqual(hash2);
      }); 
  });

});
