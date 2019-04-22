
const { hash, compare } = require('../../lib/utils/hash');
// that takes a string and returns a promise that resolves
// with a hashed password.

describe('hash function', () => {
  const password = 'mypass7890';
  it('hashes a password', () => {
    return hash(password)
      .then(hashedPwd => {
        expect(hashedPwd).toEqual(expect.any(String));
        expect(hashedPwd).not.toEqual('password');
      });
  });

});

describe('compare function', () => {
  const password = 'password';
  it('returns true if the password matches the hash', () => {
    return compare(password)
      .then(hashPass => {
        expect(hashPass).toBeTruthy;
      });
  });
});


// const salt = '$2a$10$oooooooooooooooooooooo';

//     return hashed(password, salt)
//       .then(hashedPwd => {
//         return Promise.all([
//           Promise.resolve(hashedPwd),
//           bcrypt.hash(password, salt)
//         ]);
//       })
//       .then(([hash1, hash2]) => {
//         expect(hash1).toEqual(hash2);
//       });
//   });
// });

