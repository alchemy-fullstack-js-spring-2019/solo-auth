require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      email: 'test@test.com'
    });

    expect(token).toEqual(expect.any(String));
  });
  it('can verify a token', () => {
    const token = tokenize({
      name: 'spot',
      age: 3
    });
    const obj = jwt.verify(token, 's3cret'); // was: process.env.AUTH_SECRET
    expect(obj.payload).toEqual({
      name: 'spot',
      age: 3
    });
  });
  it('can untokenize a token', () => {
    // create the token
    const token = tokenize({
      name: 'spot',
      age: 3
    });
    const string = untokenize(token);
    expect(string).toEqual({
      name: 'spot',
      age: 3
    });
  });
  it('can untokenize a bogus token', () => {
    expect(() => untokenize('bogyTok44')).toThrow('Bogus Token');
  });
});
