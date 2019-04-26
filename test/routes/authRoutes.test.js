require('dotenv').config();
const connect = require('../../lib/utils/connect.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app.js');
const User = require('../../lib/models/User.js');

describe('crud for testing a user\'s authentication', () => {
  beforeAll(() => {
    return connect();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  //user sign up give them a token 
  //user sign in, compares password with hashed password
  //check token upon another request, i.e. user auth 
  it('a user signs up', () => {
    return request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'intro_mode@email.com',
      password: 'youllneverguess'
    })
    .then(res => {
      expect(res.body).toEqual({
        user: {
          _id: expect.any(String),
          email: 'intro_mode@email.com',
        },
        token: expect.any(String)
      });
    });
  });
  it('signs a user in, compares password with hashed password', () => {
     return User
      .create({
        email: 'intro_mode@email.com',
        clearPassword: 'youllneverguess'
      })
      //otherwise we cant sign in if they dont exist
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'intro_mode@email.com',
            clearPassword: 'youllneverguess'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'intro_mode@email.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
});

