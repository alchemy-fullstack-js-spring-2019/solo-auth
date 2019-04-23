const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model test', () => {
  it('creates a user model', () => {
    const user = new User({
      email: 'test@testemail.com'
    });
    expect(user.toJSON()).toEqual({ 
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@testemail.com'
    });

  });
  it('has a required email address', () => {
    const user = new User({
    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('stores a temporary password', () => {
    const user = new User({
      email: 'test@testemail.com',
      password: 'password123'
    });
    expect(user._tempPassword).toEqual('password123');
  });
});
