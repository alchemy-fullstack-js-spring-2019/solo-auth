
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
    const obj = jwt.verify(token, process.env.AUTH_SECRET);
    expect(obj.payload).toEqual({
      name: 'spot',
      age: 3
    });
  });
  it('can untokenize a token', () => {
    const token = untokenize({
      name: 'spot',
      age: 3
    });
    const string = jwt.sign(
      token,
    );
    expect(string).toEqual({
      name: 'spot',
      age: 3
    });
  });
});
