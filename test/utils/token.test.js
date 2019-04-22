const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');
// example token = jwt.sign({ foo: 'bar' }, 'shhhhh');

describe('jwt tests', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can create a token with expiration', () => {
    const token = tokenize({
      name: 'name',
      email: 'test@email'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a token', () => {
    const token = tokenize({ animal: 'elephants' });
    const body = untokenize(token);
    expect(body).toEqual({ animal: 'elephants' });
  });
  
  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { animal: 'elephants' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ payload: { animal: 'elephants' }, iat: expect.any(Number), exp: expect.any(Number) });
  });




});
