require('dotenv').config();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');

describe('User Model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@test.com'
    });
    expect(user.toJSON()).toEqual({
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'iamapassword'
    });
    expect(user._tempPassword).toEqual('iamapassword');
  });

  it('can compare a good password', async() => {
    const passwordHash = await hash('password44');
    const user = new User({
      email: 'test@test.com',
      passwordHash
    });
    const result = await user.compare('password44');
    expect(result).toBeTruthy();
  });

  it('can create an auth token', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'randomHash'
    });

    const token = user.authToken();
    const payload = untokenize(token);
    expect(payload).toEqual({
      _id: user._id.toString(),
      email: 'test@test.com'
    });
  });
});
