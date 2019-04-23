const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User model test', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'marty@powertest.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'marty@powertest.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('takes a password and creates virtual hook', () => {
    const user = new User({
      email: 'marty@powertest.com',
      password: 'securePassword'
    });
    expect(user._tempPW).toEqual('securePassword');
  });

});
