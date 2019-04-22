const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('models', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@testy.com'
    });
    expect(user.toJSON()).toEqual({ email: 'test@testy.com', _id: expect.any(mongoose.Types.ObjectId) });
  });

  it('must have a unique email', () => {
    const user = new User({
    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toBe('Path `email` is required.');
  });

  it('stores a temp/virtual password', () => {
    const user = new User({
      email: 'email@email.com',
      password: 'password'
    });
    expect(user._tempPassword).toEqual('password');
  });
  
});
