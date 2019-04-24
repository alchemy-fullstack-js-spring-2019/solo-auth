const bcrypt = require('bcryptjs');
const { hash, saltHash, compare } = require('../../lib/utils/hash.js');
const pass = '123';
const salt = '$2a$06$CMGKFgQNvKR2cFIcjxGv6u';

describe('bcrypt', () => {
  it('hashes a pass', () => {
    bcrypt.hash(pass, 2)
      .then(hashed => {
        return Promise.all([
          Promise.resolve(hashed),
          bcrypt.hash(pass, 10)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).not.toEqual(hash2);
      });
  });

  it('creates same hash with same salts', () => {
    bcrypt.hash(pass, salt)
      .then(hashed => {
        return Promise.all([
          Promise.resolve(hashed),
          bcrypt.hash(pass, salt)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2);
      });
  });
});

describe('function works', () => {
  it('creates a unique pass', () => {
    hash(pass)
      .then(hashed => {
        return Promise.all([
          Promise.resolve(hashed),
          hash(pass)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).not.toEqual(hash2);
      });
  });

  it('creates a matching pass with same salt', () => {
    saltHash(pass, salt)
      .then(hashed => {
        return Promise.all([
          Promise.resolve(hashed),
          saltHash(pass, salt)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2);
      });
  });

  it('compare returns true if pass matches', () => {
    return hash(pass)
      .then(hashed => {
        return compare('123', hashed);
      })
      .then(compareResult => {
        expect(compareResult).toBeTruthy();   
      });
  });

  it('compare returns false if pass not matching', () => {
    return hash(pass)
      .then(hashed => {
        return compare('12', hashed);
      })
      .then(compareResult => {
        expect(compareResult).toBeFalsy();   
      });
  });
});
