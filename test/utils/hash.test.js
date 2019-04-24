const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('HASH', () => {
  it('hashes a pw using bcrypt', () => {
    return hash('password')
      .then(hashedPw => {
        expect(hashedPw).toEqual(expect.any(String));
      })
  });

  it('compares passwords', () => {
    const password = 'password';
    
    return hash(password)
      .then(hashPw => {
        return compare ('password', hashPw);
      })
      .then(compareResult => {
        expect(compareResult).toBeTruthy();
      });
  });

  it('compares passwords', () => {
    const password = 'password';
    
    return hash(password)
      .then(hashPw => {
        return compare ('smurf', hashPw);
      })
      .then(compareResult => {
        expect(compareResult).toBeFalsy();
      });
  });
});
