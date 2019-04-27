const { hash } = require('../../lib/utils/hash');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/authTest', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('has email', () => {
    const user = new User({
      email: 'testing@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'testing@test.com'
    });
  });

  it('adds a username', () => {
    const user = new User({
      email: 'testing@test.com',
      passwordHash: '1234'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'testing@test.com'
    });
  });
  
  it('validates a good model', () => {
    const user = new User({
      name: 'emily',
      email: 'testing@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email:'testing@test.com'
    });
  });

  it('has a _tempPassword', () => {
    const user = new User({
      email: 'testing@test.com',
      password: 'password0001'
    });

    expect(user._tempPassword).toEqual('password0001');
  });

  it('can compare a good password', () => {
    return User.create({
      email: 'testing@test.com',
      password: 'password0001'
    })
      .then(user => {
        return user.compare('password0001');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
    });

    it('can create an authToken', () => {
      return User.create({
        email: 'testing@test.com',
        password: 'coolPassword'
      })
      .then(user => {
        const token = user.authToken();
        const payload = untokenize(token);
        expect(payload).toEqual({
          email: 'testing@test.com',
          _id: user._id.toString()
        });
      });
    });

    it('can create an authToken with DB', () => {
      const user = new User({
        email: 'testing@test.com',
        passwordHash: 'randomHash'
      });

      const token = user.authToken();
      const payload = untokenize(token);
      expect(payload).toEqual({
        _id: user._id.toString(),
        email: 'testing@test.com'
      });
    });
});
