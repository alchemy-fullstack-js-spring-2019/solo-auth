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

  it('creates same hash & password', () => {
    const password = 'dude';
    const salt = '$2b$10$1234567890123456789012';
    return bcrypt.hash(password, salt)
      .then(p1 => {
        return Promise.all([
          Promise.resolve(p1),
          bcrypt.hash(password, salt)
        ]);
      })
      .then(([p1, p2]) => {
        console.log('test3\n', p1, '\n', p2);
        expect(p1).toEqual(p2);
      });
  });

});
