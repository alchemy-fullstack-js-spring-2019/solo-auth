const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model tests', () => {

  it('validates a good model', () => {
    const user = new User ({
      email: 'a@bcd.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'a@bcd.com'
    });      
  });

  it('has a required email field', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

});
