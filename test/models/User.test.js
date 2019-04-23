const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');

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

  it('has a static method `compare` that compares passwords', async() => {
    const hashPW = await hash('s3cr3tp@zz');
    const user = new User({
      email: 'test@martyparty.net',
      passwordHash: hashPW
    });
    const res = await user.compare('s3cr3tp@zz');
    expect(res).toBeTruthy();
  });


});
