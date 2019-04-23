require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');

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
});
