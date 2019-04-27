require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      email: 'testing@test.com'
    });

    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = tokenize({
      name: 'dog',
      age: 5
    });

    const obj = jwt.verify(token, process.env.AUTH_SECRET);

    expect(obj.payload).toEqual({
      name: 'dog',
      age: 5
    });
  });

  it('can untokenize a token', () => {
    const token = tokenize({
      name: 'pupper',
      age: 2
    });

    const obj = untokenize(token);

    expect(obj).toEqual({
      name: 'pupper',
      age: 2
    });
  });

  it('can untokenize a bogus token', () => {
    const token = tokenize({
      name: 'fido',
      age: 5
    });

    const obj = untokenize(token);
    expect(obj).toEqual({
      name: 'fido',
      age: 5
    });
  });
});
