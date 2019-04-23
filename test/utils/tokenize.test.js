const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');


describe('tokenize', () => {
  it('can create a token', () => {
    const token = tokenize({
      payload: {
        _id: '321',
        email: 'email@email.com'
      }
    });
    expect(token).toEqual(expect.any(String));
  });
  it('can verify a token', () => {
    const token = tokenize({
      name: 'robbie',
      age: 9
    });
    const obj = jwt.verify(token, process.env.AUTH_SECRET);
    expect(obj.payload).toEqual({
      name: 'robbie',
      age: 9
    });
    it('can untokenize', () => {
        const token = tokenize({
            

        });

    });
  });
});
