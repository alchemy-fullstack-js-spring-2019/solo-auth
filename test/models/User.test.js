const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('validates a good model', () => { 
    const user = new User({
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId), 
      email: 'test@test.com' 
    });
  });

  it('has a required email', () => {
    const user = new User({});

    const errors = user.validateSync().errors;
    expect(errors.email.message).toBe('Path `email` is required.');
  });

  it('stores a temp password', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password123'
    });

    expect(user._tempPassword).toEqual('password123');
  });
});
