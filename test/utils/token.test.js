require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const payload = {
      _id: '1234',
      email: 'test@test.nz'
    };
    const token = tokenize(payload);

    expect(token).toEqual(expect.any(String));
  });
  it('can untokenize a token', () => {
    const payload = {
      _id: '1234',
      email: 'test@test.nz'
    };
    const token = tokenize(payload);
    const untokenedPayload = untokenize(token);
    expect(untokenedPayload).toEqual({
      _id: '1234',
      email: 'test@test.nz'
    });
    
  });
});

