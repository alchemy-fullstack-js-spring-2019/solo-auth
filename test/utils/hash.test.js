const { passHash, passCompare } = require('../../lib/utils/hash');
const bcrypt = require('bcryptjs');

describe('hash stuff', () => {
  it('will take a string and return a unique hashed password', ()=> {
    const password = 'coolpw123';
    return passHash(password)
      .then(hashedPassword => {
        return Promise.all([
          Promise.resolve(hashedPassword),
          bcrypt.hash(password, 10)
        ]);
      })
      .then(([hashedPassword, otherHash]) => 
        expect(hashedPassword).not.toEqual(otherHash)
      );
  });
  
  it('can compare passwords', () => {
    const password = 'coolpw123';

    return passHash(password)
      .then(hashedPassword => {
        return passCompare('coolpw123', hashedPassword);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });
});
