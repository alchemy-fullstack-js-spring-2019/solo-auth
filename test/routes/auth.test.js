require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
// const User = require('../../lib/models/User');

describe.skip('AUTH ROUTES', () => {
  
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    mongoose.connection.dropDatabase();
  });

  // afterAll(() => {
  //   return mongoose.connection.close();
  // });

  it('sign up new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'a@email.com',
        password1: 'password2'
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'a@email.com'
          },
          token: expect.any(String)
        });
      });

  });



});
