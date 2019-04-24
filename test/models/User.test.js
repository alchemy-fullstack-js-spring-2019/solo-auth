require('dotenv').config();
const mongoose = require('mongoose');
const { untokenize } = require('../../lib/utils/token');
const User = require('../../lib/models/User');

describe('User model', () => {
  beforeAll(() => {
    return mongoose.connect('MONGODB_URI=mongodb://localhost:27017/auth',useCreateIndex: true,
    useFindAndModify: false,
    use )
  });
  it('has an email address', () => {
    const user = new User({
      email: 'email@email.com'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'email@email.com'
    });
  });
  it('has a temp password', ()=> {
    const user = new User({
      email: 'email@email.com',
      password: 'password456'
    });
    expect(user._tempPassword).toEqual('password456');
  });
  it('adds a username', () => {
    const user = new User({
      email: 'email@email.com',
      passwordHash: '123456'
    });
    
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      email: 'email@email.com'


    });
  });
});

