const { createHash } = require('../../lib/utils/hash');
const { hashTrue } = require('../../lib/utils/hash');


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
      });
  });
});
