require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenize = require('../../lib/utils/token');

describe('json web token tests', () => {

  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

});

describe('tokenize function tests', () => {

  it('returns a token', () => {
    const payload = { 
      payload: {
        name: 'Ryan Gosling',
        location: 'Los Angeles'
      }
    };
    const result = tokenize(payload);
    const expected = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '24h' });
    expect(result).toEqual(expected);

  });

});
