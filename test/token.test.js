require('dotenv').config();
const { tokenize } = require('../lib/utils/token');

describe('token test', () => {
  it('creates a token', () => {
    const payload = {
      _id: '8675309',
      email: 'chickenfingers@yum.com'
    };
    expect(tokenize(payload)).toEqual(expect.any(String));
  });
});
