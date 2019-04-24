require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

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
  
  it('tokenize function', () => {
    const token = tokenize({
      _id: '123',
      email: 'fake@email.com'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('jwt verify', () => {
    const token = tokenize({
      name: 'spot',
      age: 12
    });

    const obj = jwt.verify(token, process.env.AUTH_SECRET);

    expect(obj.payload).toEqual({
      name: 'spot',
      age: 12
    });
  });
  
  it('untokenize function', () => {
    const token = tokenize({
      name: 'spot',
      age: 12
    });

    const payload = untokenize(token);

    expect(payload).toEqual({
      name: 'spot',
      age: 12
    });
  });


});
