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
    mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can sign up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password: 'imapassword'
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
  it('can sign in a user', () =>{
    return User.create({
      email: 'email@email.com',
      password: 'password123'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'email@email.com',
            password: 'password123' 
          });
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
