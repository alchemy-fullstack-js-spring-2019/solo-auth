const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('models', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@testy.com'
    });
    expect(user.toJSON()).toEqual({ email: 'test@testy.com', _id: expect.any(mongoose.Types.ObjectId) });
  });
});
