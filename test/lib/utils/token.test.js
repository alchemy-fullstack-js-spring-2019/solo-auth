const { tokenizer } = require('../../../lib/utils/token');
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
});
