require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth routes', () => {

  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('sign up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test1235@test.com',
        password: 'password1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test1235@test.com',
          },
          token: expect.any(String)
        });
      });
  });

  it('can sing in a user', () => {
    return User
      .create({ 
        email: 'joeshmo@yahoo.com', 
        password: 'secretPhrase' 
      })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ email: 'joeshmo@yahoo.com', password: 'secretPhrase' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'joeshmo@yahoo.com',
          },
          token: expect.any(String)
        });
      });
  });

  it('try to sing in a user with bad password', () => {
    return User
      .create({ 
        email: 'joeshmo@yahoo.com', 
        password: 'secretPhrase' 
      })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ email: 'joeshmo@yahoo.com', password: 'dumbdumbforgot' });
      })
      .then(res => {
        expect(res.body).toEqual({
          error: 'Invalid Authentication'
        });
      });
  });

});
