const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User model tests', () => {
  it('creates a user', () => {
    const user = new User({
      email: 'test@email.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'test@email.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('it requires an email', () => {
    const user = new User({
      email: ''
    });
    const error = user.validateSync().errors;
    expect(error.email.message).toEqual('Path `email` is required.');
  });
});
