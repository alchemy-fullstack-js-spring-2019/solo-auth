const { hash, compareHash } = require('../../lib/utils/hash');

describe('hash', () => {
  it('hashes a password', async() => {
    const hashedPassword = await hash('maddyGurl23');
    expect(hashedPassword).toEqual(expect.any(String));
    expect(hashedPassword).not.toEqual('maddyGurl23');
  });

  it('can compare password', async() => {
    const hashed = await hash('maddyGurl23');
    const compared = await compareHash('maddyGurl23', hashed);
    expect(compared).toBeTruthy();
  });

  it('can compare bad password', async() => {
    const hashed = await hash('maddyGurl23456');
    const compared = await compareHash('maddyGurl23', hashed);
    expect(compared).toBeFalsy();
  });
});
