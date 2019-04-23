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
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'name@email.com',
        pw: 'password1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'name@email.com',
          },
          token: expect.any(String)
        });
      });
  });

  it('can signin a user', () => {
    return User.create({
      email: 'name@email.com',
      pw: 'password1234'
    })
      .then((user) => {
        // console.log(user);
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'name@email.com',
            pw: 'password1234'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'name@email.com'
          },
          token: expect.any(String)
        });
      });

  });
});
