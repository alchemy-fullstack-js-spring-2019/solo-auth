const User = require('../../lib/models/User.js');
const mongoose = require('mongoose')

describe('user', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'intro_mode@email.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'intro_mode@email.com',
      _id: expect.any(mongoose.Types.ObjectId)
    })
  })
})
