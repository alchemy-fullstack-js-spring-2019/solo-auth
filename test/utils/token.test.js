const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
// example token = jwt.sign({ foo: 'bar' }, 'shhhhh');

describe('jwt tests', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ paylod: { animal: 'elephants' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ paylod: { animal: 'elephants' }, iat: expect.any(Number) });
  });
  
  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { animal: 'elephants' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ payload: { animal: 'elephants' }, iat: expect.any(Number), exp: expect.any(Number) });
  });

  it('can create a token with expiration', () => {
    const token = tokenize({
      payload: {
        name: 'name',
        email: 'test@email'
      }
    });
    expect(token).toEqual(expect.any(String));
  });





});
