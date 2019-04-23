const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model tests', () => {
  it('creates a user', () => {
    const user = new User({
      email: 'test@email.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@email.com'
    });
  });

  it('it requires an email', () => {
    const user = new User({
      email: ''
    });
    const error = user.validateSync().errors;
    expect(error.email.message).toEqual('Path `email` is required.');
  });

  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'icecreamlov3@hotmail.com',
      clearPassword: 'i<3IceCream!'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'icecreamlov3@hotmail.com'
    });
    expect(user._tempPassword).toEqual('i<3IceCream!');
  });
});
