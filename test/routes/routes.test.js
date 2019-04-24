require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const User = require('../../lib/models/User');


describe('routes tests', () => {
  beforeAll(() => {
    return connect();
  });
    
  beforeEach(() => {
    mongoose.connection.dropDatabase();
  });
    
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a user on /signup', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@email.com',
        password: '123test'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@email.com'
          }, 
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return User.create({
      email: 'test@email.com',
      password: '123butts'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'test@email.com',
            password: '123butts' 
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: expect.any(String),
                email: 'test@email.com'
              }, token: expect.any(String)
            });
          });
      });
  });

  it('verifies a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@yourmom.com',
        password: 'chunkymutha'
      })
      .then(res => {
        console.log('test token', res.body.token);
        return request(app) 
          .get('/api/v1/auth/verify')
          .set('Authorization', `Bearer ${res.body.token}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              email: 'test@yourmom.com'
            });
          });
      });
  });

});
