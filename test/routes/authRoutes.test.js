require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app.js');
const connect = require('../../lib/utils/connect.js');
const User = require('../../lib/models/User.js');

describe('crud for testing a user\'s authentication', () => {
  beforeAll(() => {
    //why do we have to return in front of this and the afterAll but not in front of the dropDatabase?
    return connect();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    mongoose.connection.dropDatabase();
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
      console.log(res.body)
      expect(res.body).toEqual({
        user: {
          _id: expect.any(String),
          email: 'intro_mode@email.com',
        },
        token: expect.any(String)
      });
    });
  });
});

