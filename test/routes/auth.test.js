require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth route tests', () => {

  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can sign up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'hello@app.com',
        password: 'boots'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'hello@app.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return User.create({
      email: 'bonnie@acl.com',
      password: 'imtired'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'bonnie@acl.com',
            password: 'imtired'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'bonnie@acl.com'
          },
          token: expect.any(String)
        });
      });

  });


});
