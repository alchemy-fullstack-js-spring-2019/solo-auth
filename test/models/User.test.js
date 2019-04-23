require('dotenv').config();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');

describe('User', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'person@test.com' });
    expect(user.toJSON().email).toEqual('person@test.com');
    expect(user.toJSON()._id).toEqual(expect.any(mongoose.Types.ObjectId));
  });
  it('has required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });


  it('has a virtual password', () => {
    const user = new User({
      email: 'email.email.com', 
      password: 'password123'
    });
    expect(user._tempPassword).toEqual('password123');
  });

  it('adds a username', () => {
    const user = new User({
      email: 'email.person.com' 
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'email.person.com'
    });
  });

  it('compares', async() => {
    const hashed = await hash('maddyGurl');
    const user = await new User({ 
      email: 'person@test1234.com', 
      passwordHash: hashed
    });
    expect(await user.compare('maddyGurl')).toBeTruthy();
  });

  it('compares bad password', async() => {
    const hashed = await hash('maddyGurl');
    const user = await new User({ 
      email: 'person@test1234.com', 
      passwordHash: hashed
    });
    expect(await user.compare('maddyperson')).toBeFalsy();
  });

  it('can create a authToken', () => {
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
