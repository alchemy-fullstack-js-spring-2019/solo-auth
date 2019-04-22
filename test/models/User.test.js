const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('user auth', () => {
  it('has creates a user', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });
  });

  it('has creates a user', () => {
    const user = new User({ });
    const errors = user.validateSync().errors;
    console.log(errors.email.message);
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
