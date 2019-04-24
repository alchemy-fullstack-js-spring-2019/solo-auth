require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');

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

  it('can signup a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ 
        email: 'megan@megan.com',
        password: 'hello12'
      })
      .then(res => {
        expect(res.body).toEqual({ user: {
          _id: expect.any(String),
          email: 'megan@megan.com'
        },
        token: expect.any(String) });
      });
  });
  
  it('can sign in a user', () => {
    return User.create({
      email: 'megan@megan.com',
      password: 'xxxxx'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'megan@megan.com',
            password: 'xxxxx'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'megan@megan.com'
          },
          token: expect.any(String) });
      });
  });
});
