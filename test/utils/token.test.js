const tokenize = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const payload = {
      _id: '1234',
      email: 'test@test.nz'
    };
    const token = tokenize(payload, 's3cr3t');

    expect(token).toEqual('?');
  });
});

