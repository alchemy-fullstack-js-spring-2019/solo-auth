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

  it('can signup a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'emily@test.com',
        password: 'coolpassword'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            __v: 0,
            _id: expect.any(String),
            email: 'emily@test.com',
          },
          token: expect.any(String),
        });
      });
  });

  it('can sign in a user', () => {
    return User.create({
      email: 'emily@test.com',
      password: 'coolpassword'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'emily@test.com',
            password: 'coolpassword'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            __v: 0,
            _id: expect.any(String),
            email: 'emily@test.com',
          },
          token: expect.any(String),
        });
      });
  });
});
