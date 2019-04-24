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
    const output = untokenize(token);
    
    expect(output).toEqual(input);
  });

  it('throws bogus token', () => {
    expect(() => untokenize('1234')).toThrow('Bogus Token');
  });
});
