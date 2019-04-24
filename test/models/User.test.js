require('dotenv').config();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
//eslint-next-line-disable
const { untokenize } = require('../../lib/utils/token');

describe('User model test', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ 
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'test@test.com'
    });
  });

  it('has a password virtual', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'password123'
    });
    expect(user._tempPassword).toEqual('password123');
  });

  it('says banana', () => {
    const user = new User({
      email: 'abc@123.com'
    });

    expect(user.banana()).toEqual('banana');
  });

  it('compares a hash if true', async() => {
    const passwordHash = await hash('password123');
    const user = new User({
      email: 'cosmo@cosmo.com',
      passwordHash: passwordHash
    });
    const result = await user.compare('password123');
    expect(result).toEqual(true);
  });

  it('compares a hash if false', async() => {
    const passwordHash = await hash('password123');
    const user = new User({
      email: 'cosmo@cosmo.com',
      passwordHash: passwordHash
    });
    const result = await user.compare('badPassword');
    expect(result).toEqual(false);
  });

  it('creates an auth token out of the user', () => {
    const user = new User({
      email: 'test@test.com',
      passwordHash: 'randomhash'
    });
    const token = user.authToken();

    const payload = untokenize(token);

    expect(payload).toEqual({
      email: 'test@test.com',
      _id: expect.any(String)
    });
  });
});
