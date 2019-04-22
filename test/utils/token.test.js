const tokenize = require('../../lib/utils/token');

describe('jwt token test', () => {
  it('can create a token', () => {
    const token = tokenize({ hi: 'there' });
    expect(token).toEqual(expect.any(String));
  });
});
