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
      name: 'Mister',
      age: 8
    });

    const obj = untokenize(token);

    expect(obj).toEqual({
      name: 'Mister',
      age: 8
    });
  });
});
