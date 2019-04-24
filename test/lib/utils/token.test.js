const { tokenizer, untokenizer } = require('../../../lib/utils/token');
require('dotenv').config();

describe('jwt token', () => {
  it('creates a token', () => {
    const payload = {
      id: 12345,
      email: 'test@test.com'
    };

    const token =  tokenizer(payload);
    expect(token).toEqual(expect.any(String));
  });

  it('takes a token and returns a payload', () => {
    const token = tokenizer({
      name:'Cols',
      age:34
    });

    const obj = untokenizer(token);

    expect(obj).toEqual({
      name: 'Cols',
      age: 34
    });
  });
});
