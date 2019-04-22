require('dotenv').config();
const { createToken } = require('../../lib/utils/token');

describe('token tests', () => {
  it('can create a token', () => {
    const payload = { hi: 'there' };
    expect(createToken(payload)).toEqual(expect.any(String));
  });
});
