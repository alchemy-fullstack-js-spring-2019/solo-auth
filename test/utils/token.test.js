require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');
const jwt = require('jsonwebtoken');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      email: 'test@test.com'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a token', () => {
    const token = tokenize({
      name: 'spot',
      age: 12
    });

    const obj = untokenize(token);

    expect(obj).toEqual({
      name: 'spot',
      age: 12
    });
  });

  it('can verify a token with expiration', () => {
    const token = tokenize({ hi: 'there' });

    const body = jwt.verify(token, process.env.AUTH_SECRET, { expiresIn: '1h' });

    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number) });
  }); 
});
