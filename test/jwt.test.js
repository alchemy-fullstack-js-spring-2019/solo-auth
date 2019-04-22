const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize, untokenize } = require('../lib/utils/jwt.js');

describe('jwt', () => {
  it('uses a tokenize function to take user data and a secret and generate a jwt', () => {
    const token = tokenize({
       id: '543fds',
      email: 'intro_mode@email.com'
    });
    expect(token).toEqual(expect.any(String));
  });
  it('VERIFIES A TOKEN, in other words, it uses an untokenize function to take a token and return the payload data that was originally given to create that given token', () => {
    //if we want to use our function to verify a token, we have to first create a token! 
    const token = tokenize({
      name: 'b0ttle',
      age: 196
    });
    const payload = untokenize(token);

    expect(payload).toEqual({
      name: 'b0ttle',
      age: 196
    });
  });
});
