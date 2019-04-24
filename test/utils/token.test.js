require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('tokens', () => {

  it('creates a token', () => {
    const token = tokenize({
      _id: '1245',
      email: 'someperon@place.com'
    });
    expect(token).toEqual(expect.any(String));
    expect(token.split('.').length).toEqual(3);
  });

  it('return payload for a token', () => {
    const token = tokenize({
      name: 'Noodle',
      species: 'dumb chicken'
    });
    expect(untokenize(token)).toEqual({
      name: 'Noodle',
      species: 'dumb chicken'
    });
  });

  it('return err for a bad token', () => {
    expect(() => untokenize('12345')).toThrow('Bogus Token');
  });
});

