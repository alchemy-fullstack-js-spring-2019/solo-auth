require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
// const User = require('../../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signup new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'email@email.com'
          },
          token: expect.any(String)
        });
      });
  });
});
