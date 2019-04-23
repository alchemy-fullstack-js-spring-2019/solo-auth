const User = require('../../lib/models/User');
const mongoose = require('mongoose');


describe('User model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'megan@megan.com'
    });

    expect(user.toJSON()).toEqual({
      email: 'megan@megan.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required email', () => {
    const user = new User({

    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'megan@megan.com',
      password: 'secret'
    });

    expect(user.toJSON()).toEqual({
      email: 'megan@megan.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
    expect(user._tempPassword).toEqual('secret');
  });
});
