require('dotenv').config();
const { createToken, verifyToken } = require('../../lib/utils/token');

describe('token tests', () => {
  const payload = { hi: 'there' };
  it('can create a token', () => {
    expect(createToken(payload)).toEqual(expect.any(String));
  });
  
  it('can verify a token with expiration', () => {
    const token = createToken(payload);
    const body = verifyToken(token);
    expect(body).toEqual({ payload, iat: expect.any(Number), exp: expect.any(Number) });
  });

});
