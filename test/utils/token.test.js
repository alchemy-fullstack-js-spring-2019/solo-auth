const jwt = require('jsonwebtoken');
const { tokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1111',
      email: 'name@email.com'
    });

    expect(token).toEqual(expect.any(String));
  });
  it('can verify a token', () => {
    const token = tokenize({
      name: 'spot',
      age: 11
    });
    const obj = jwt.verify(token, process.env.AUTH_SECRET);
  });
  expect(obj.payload).toEqual({
    name: 'spot',
    age: 11
  });
});
