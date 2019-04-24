require('dotenv').config;
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    return connect('mongodb://localhost:27017/auth');
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase(); // return?
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  //   it('can sign up a new user', () => {
  //     const user = new User({
  //       email: 'test@test.com',
  //       password: 'password333'
  //     });
  //     return request(app)

  //       .post('/api/v1/auth/signup')
  //       .send(user)
  //       .then(res => {
  //         expect(res.body).toEqual({
  //           user: {
  //             _id: expect.any(String),
  //             email: 'test@test.com',
  //           },
  //           token: expect.any(String)
  //         });
  //       });
  //   });
  // });

  it('exists', () => {
    expect('a').toEqual('a');
  });
});

