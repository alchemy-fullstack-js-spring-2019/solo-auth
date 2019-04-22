require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');


describe('token', () => {
  it('creates a jwt token', () => {
    const token = tokenize({
      name: 'Tom',
      email: 'tom@myspace.com'
    });

    expect(token).toEqual(expect.any(String));
  });

  it('verifies a token', () => {
    const token = tokenize({
      name: 'Steve',
      age: 1
    });

    const obj = untokenize(token);

    expect(obj).toEqual({
      name: 'Steve',
      age: 1
    });
  });
});
