const jwt = require('jsonwebtoken');
const { token } = require('../../lib/utils/token');

describe('jwt', () => {
  it('can create a token', () => {
    const payload = { _id: 23455, email: 'megan@megan.com' };
    const secret = 's3cret';
    const options = { expiresIn: '2h' };

    const result = token(payload, secret, options);
    
    expect(result).toEqual(expect.any(String));
  });
});
