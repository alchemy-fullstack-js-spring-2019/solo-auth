require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token tests', () => {
  it('creates a token', () => {
    const input = {
      hi: 'there'
    };
    const token = tokenize(input);
    expect(token).toEqual(expect.any(String));
  });

  it('decodes a token', () => {
    const input = {
      hi: 'there'
    };
    const token = tokenize(input);
    const output = untokenize(token, process.env.AUTH_SECRET);
    
    expect(output).toEqual({
      ...input,
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });
});
