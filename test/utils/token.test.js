require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

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
      name: 'Ryan Gosling',
      location: 'Los Angeles'
    };
    const result = tokenize(payload);
    expect(result).toEqual(expect.any(String));
  });

  it('gets the payload from a token', () => {
    const object = { 
      name: 'Ryan Gosling',
      location: 'Los Angeles'
    };
    const token = tokenize(object);
    const result = untokenize(token);
    expect(result).toEqual(object);
  });

  it('untokenizes a bogus token', () => {
    expect(() => untokenize('123')).toThrowError('Bogus Token');
  });

});
