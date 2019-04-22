const passHash = require('../../lib/utils/hash');
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
  /*could also be as simple as:
  it(returns a password, ()=> {
    return passHash('coolpw123')
    .then(hashedPassword => {
      expect(hashedPassword).toEqual(expect.any(String));
      expect(hashedPassword).not.toEqual('coolpw123');
    })
  })
  */
});
