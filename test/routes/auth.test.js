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

  it('can signup a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'test@test.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () =>{
    return User
      .create({
        email: 'test2@test.com',
        password: 'password1234'
      })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'test2@test.com',
            password: 'password1234'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'test2@test.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('throws an error on incorrect password', () =>{
    return User
      .create({
        email: 'test3@test.com',
        password: 'password1234'
      })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'test3@test.com',
            password: 'badPassword'
          });
      })
      .then(res => {
        expect(res.body.error).toEqual('Invalid Authentication');
      });
  });

  it('throws an error on incorrect email', () =>{
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test4@test.com',
        password: 'badPassword'
      })
      .then(res => {
        expect(res.body.error).toEqual('Invalid Authentication');
      });
  });

  it('verifies token', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test5@test.com',
        password: 'password4567'
      })
      .then(res => {
        return request(app)
          .get('/api/v1/auth/verify')
          .set('Authorization', `Bearer ${res.body.token}`)
          .then(result => {
            console.log(result.body);
            expect(result.body).toEqual({
              email: 'test5@test.com',
              _id: expect.any(String)
            });
          });
      });
  });
});
