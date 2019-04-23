require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
// require('../connect-db');
const request = require('supertest');
const app = require('../../lib/app');

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

  it('can sign up a user', () => {
    const newUser = { email: 'test@test.com', password: 'password1234' };
    return request(app)
      .post('/api/v1/auth')
      .send(newUser)
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });
});
