require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token tests', () => {
  it('can create a token', () => {
    const token = tokenize({
      payload: {
        _id: '1234',
        email: 'cosmo@cosmo.com'
      }
    });

    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize', () => {
    const token = tokenize({
      payload: {
        _id: '1234',
        email: 'cosmo@cosmo.com'
      }
    });

    const result = untokenize(token);

    expect(result.payload).toEqual({
      _id: '1234',
      email: 'cosmo@cosmo.com'
    });
  });
});
