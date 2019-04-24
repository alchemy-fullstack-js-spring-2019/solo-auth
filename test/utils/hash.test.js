
const { hash, compare } = require('../../lib/utils/hash');
// that takes a string and returns a promise that resolves
// with a hashed password.

describe('hash function', () => {
  const password = 'password';
  it('hashes a password', () => {
    return hash(password)
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual(password);
      });
  });

  it('returns true if the password matches the hash', () => {
    return hash(password)
      .then(hashedPassword => {
        return compare('password', hashedPassword);
      })
      .then(compareResult => {
        expect(compareResult).toBeTruthy();
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

