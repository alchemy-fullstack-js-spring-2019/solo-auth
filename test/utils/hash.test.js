const bcrypt = require('bcryptjs');
const { createHash } = require('../../lib/utils/hash');
const { hashTrue } = require('../../lib/utils/hash');
const { createSaltHash } = require('../../lib/utils/hash');


describe('hash test', () => {
  it('can compare hashes based on same password', () => {
    const pw = 'password123';
    return createHash(pw)
      .then(hashedPw => {
        return Promise.all([
          Promise.resolve(hashedPw),
          createHash(pw)
        ])
          .then(([hashed1, hashed2]) => {
            expect(hashed1).not.toEqual(hashed2);
          });
      });
  });

  it('can compare passwords', () => {
    const pw = 'dfggfsj';
    return createHash(pw)
      .then(created => {
        return bcrypt.compare(pw, created);
      })
      .then(compareResult => {
        expect(compareResult).toBeTruthy();
      });
  });

  it('returns true if password matches hash, otherwise false', () => {
    const pw = 'abc123';
    const hash = '$2a$10$tVFy.5q2G62e8wmQyEpg5.7ohTVgc1nd8KQifF3BEiDP8o5F6fq/W';
    const res = hashTrue(pw, hash);
    expect(res).toBe(false);
  });

  it('can turn a password into a hash', () => {
    const pw = 'password123';
    return createHash(pw)
      .then(hashedPw => {
        expect(hashedPw).not.toEqual(pw);
        expect(hashedPw).toEqual(expect.any(String));
      });
  });

  it('can turn a password into a hash ASYNC', async() => {
    const pw = 'password123';
    const hashedPw = await createHash(pw);
    expect(hashedPw).not.toEqual(pw);
    expect(hashedPw).toEqual(expect.any(String));
  });

  it('can generate a random salt and add to hash', async() => {
    const pw = 'passwordsarecool';
    const saltHashedPw = await createSaltHash(pw);
    expect(saltHashedPw).not.toEqual(pw);
    expect(saltHashedPw).toEqual(expect.any(String));
  });
});
