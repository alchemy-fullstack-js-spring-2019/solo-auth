const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User Test', () => {
  
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId) 
    });
  });

  it('has required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ 
      email: 'test@test.com',
      password1: '1234'
    });
    expect(user._tempPassword).toEqual('1234');
  });


});
