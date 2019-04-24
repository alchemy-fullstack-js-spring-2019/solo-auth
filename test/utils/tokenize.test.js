require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');


describe('tokenize', () => {
  it('can create a token', () => {
    const token = tokenize({
      
      _id: '321',
      email: 'email@email.com'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a token', () => {
    const token = tokenize({
      name: 'rufus',
      age: 12

    });
    const object = untokenize(token);

    expect(object).toEqual({
      name: 'rufus',
      age: 12
    });
  
  });
  it('can untokenize a BOGUS token', () => {
    expect(() => untokenize('4567')).toThrow('it\'s bogus dude!');
  });

});
