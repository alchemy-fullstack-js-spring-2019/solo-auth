const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('bcrypt hash tests', () => {

  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        // eslint-disable-next-line no-console
        console.log(hashedPassword);
        expect(hashedPassword).toBeDefined();
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

  it('creates the same hash given the same salt', () => {
    const password = 'magnolia';
    const salt = '$2b$10$ABCDEFGHIABCDEFGHI1234';
    return bcrypt.hash(password, salt)
      .then(hashed => {
        return Promise.all([
          Promise.resolve(hashed),
          bcrypt.hash(password, salt)
        ])
          .then(([pw1, pw2]) => {
            expect(pw1).toEqual(pw2);
          });
      });
  });

});

describe('hash function tests', () => {

  it('takes a string and returns a hashed password', () => {
    const password = 'leland';
    return hash(password)
      .then(hashed => {
        expect(hashed).toBeDefined();
      });
  });

  it('compares a password string and its hash', () => {
    const password = 'barry';
    return hash(password)
      .then(hashedPassword => {
        return compare(password, hashedPassword)
          .then(result => {
            expect(result).toBe(true);
          });
      });
  });

  it('compares a password string and another hash', () => {
    const password = 'barry';
    return hash(password)
      .then(hashedPassword => {
        return compare('password', hashedPassword)
          .then(result => {
            expect(result).toBe(false);
          });
      });
  });

});
