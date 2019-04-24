require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  beforeAll(() =>{
    return mongoose.connect('mongodb://localhost:27017/auth', {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true
    });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
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
  it('can compare a good password', () =>{

  });
});

