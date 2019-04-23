require('dotenv').config();
const User = require('../../lib/models/User');
const { hash } = require('../../lib/utils/hash');
const { untokenize } = require('../../lib/utils/token');
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

  it('has a instance method `compare` that compares passwords', async() => {
    const hashPW = await hash('s3cr3tp@zz');
    const user = new User({
      email: 'test@martyparty.net',
      passwordHash: hashPW
    });
    const res = await user.compare('s3cr3tp@zz');
    expect(res).toBeTruthy();
  });
  it('has compares bad passwords', async() => {
    const hashPW = await hash('s3cr3tp@zz');
    const user = new User({
      email: 'test@martyparty.net',
      passwordHash: hashPW
    });
    const res = await user.compare('notsecretpass');
    expect(res).toBeFalsy();
  });

  it('has an authToken instance method', async() => {
    const hashPW = await hash('s3cr3tp@zz');
    const user = new User({
      email: 'test@martyparty.net',
      passwordHash: hashPW
    });

    const token = user.authToken();
    expect(token).toEqual(expect.any(String));
    expect(untokenize(token)).toEqual({
      email: 'test@martyparty.net',
      _id: expect.any(String)
    });
  });

});
