require('dotenv').config();
const { tokenize, untokenize } = require('../lib/utils/token');

describe('token test', () => {
  it('creates a token', () => {
    const payload = {
      _id: '8675309',
      email: 'chickenfingers@yum.com'
    };
    expect(tokenize(payload)).toEqual(expect.any(String));
  });

  it('returns the payload from a token', () => {
    const payload = {
      name: 'Gram-Gram',
      email: 'oldladybreath@grandma.com'
    };
    const token = tokenize(payload);
    expect(untokenize(token)).toEqual({
      name: 'Gram-Gram',
      email: 'oldladybreath@grandma.com'
    });
  });
});
