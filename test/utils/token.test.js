require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');


describe('token', () => {
  it('creates a jwt token', () => {
    const token = tokenize({
      name: 'Tom',
      email: 'tom@myspace.com'
    });

    console.log(token);

    expect(token).toEqual(expect.any(String));
  });
});
