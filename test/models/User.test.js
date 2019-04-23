const User = require('../../lib/models/User');

describe('User tests', () => {
  it('validates good model', () => {
    const user = new User({ email: 'email@aol.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'email@aol.com',
      _id: expect.anything()
    });
  });

  it('has email required', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    console.log(errors);
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
