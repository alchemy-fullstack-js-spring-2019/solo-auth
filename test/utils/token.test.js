require('dotenv').config();
const { token, untokenize } = require('../../lib/utils/token');

describe('jwt', () => {
  it('can create a token', () => {
    const payload = { _id: 23455, email: 'megan@megan.com' };
    const result = token(payload);
    
    expect(result).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const payload = { _id: 23455, email: 'megan@megan.com' };
    const body = token(payload);

    const obj = untokenize(body);

    expect(obj.payload).toEqual({
      _id: 23455, email: 'megan@megan.com' 
    });
  });

  it('can verify a token with expiration', () => {
    const newToken = token({ _id: 23455, email: 'megan@megan.com' });

    const obj = untokenize(newToken);

    expect(obj).toEqual({ 
      exp: expect.any(Number), 
      iat: expect.any(Number), 
      payload: { 
        _id: 23455, 
        email: 'megan@megan.com' 
      } 
    });
  });
});
