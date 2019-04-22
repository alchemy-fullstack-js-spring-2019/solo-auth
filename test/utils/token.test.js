require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize } = require('../../lib/utils/token');

describe('JWT TOKEN', () => {

  it('create a token', () => {
    const token = jwt.sign({
      payload: {
        _id: '123',
        email: 'fake@email.com'
      }
    }, 'sEcret', { expiresIn: '1d' });
    expect(token).toEqual(expect.any(String));
  });
  
  it.only('tokenize function', () => {
    const token = tokenize({
      _id: '123',
      email: 'fake@email.com'
    });
    expect(token).toEqual(expect.any(String));
  });


});
