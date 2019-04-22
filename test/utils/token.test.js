require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      email: 'leslie@gmail.com'
    });

    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a token', () => {
    const token = tokenize({
      _id: '1234',
      email: 'leslie@gmail.com'
    });

    const obj = untokenize(token);

    expect(obj).toEqual({
      _id: '1234',
      email: 'leslie@gmail.com'
    });
  });
});
