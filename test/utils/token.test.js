require('dotenv').config();
const { token } = require('../../lib/utils/token');

describe('jwt', () => {
  it('can create a token', () => {
    const payload = { _id: 23455, email: 'megan@megan.com' };
    const options = { expiresIn: '2h' };

    const result = token(payload, options);
    
    expect(result).toEqual(expect.any(String));
  });
  // it('can verify a token', () => {
  //   const body = token()
  // })
});
