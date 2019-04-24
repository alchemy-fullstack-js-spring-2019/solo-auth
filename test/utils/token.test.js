require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');


describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1111',
      email: 'name@email.com'
    });

    expect(token).toEqual(expect.any(String));
  });
  it('can untokenize a token', () => {
    const token = tokenize({
      name: 'ruby', 
      age: 2
    });
    const obj = untokenize(token);
    expect(obj).toEqual({
      name: 'ruby',
      age: 2
    });
  });
  it('can untokenize a bogus token', () => {
    expect(() => untokenize('12345')).toThrow('Bogus Token');
  });
});
