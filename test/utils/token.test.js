require('dotenv').config();
const { signToken, verifyToken } = require('../../lib/utils/token');

describe('token tests', () => {
  it('can create a token', () => {
    const token = signToken({
      payload: {
        _id: '1234',
        email: 'cosmo@cosmo.com'
      }
    });

    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize', () => {
    const token = signToken({
      payload: {
        _id: '1234',
        email: 'cosmo@cosmo.com'
      }
    });

    const payload = verifyToken(token);

    expect(payload.payload).toEqual({
      _id: '1234',
      email: 'cosmo@cosmo.com'
    });
  });
});
