require('dotenv').config();
const { createToken, verifyToken } = require('../../lib/utils/token');

describe('token tests', () => {
  const payload = { hi: 'there' };
  it('can create a token', () => {
    expect(createToken(payload)).toEqual(expect.any(String));
  });
  
  it('can untokenize a token', () => {
    const token = createToken(payload);
    const body = verifyToken(token);
    expect(body).toEqual(payload);
  });
  
  it('can untokenize a bogus token', () => {
    expect(() => verifyToken('1234')).toThrow('Bogus');
  });

});
