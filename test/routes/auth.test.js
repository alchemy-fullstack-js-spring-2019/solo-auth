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

  it('creates a new user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'tester', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({
          token: expect.any(String),
          user: {
            email: 'tester',
            _id: expect.any(String)
          }
        });
      });
  });
  
  it('signs in a user', () =>{
    User.create({ email: 'user@test.com', password: '1234' });

    return request(app)
      .post('/auth/signin')
      .send({ email: 'user@test.com', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({
          token: expect.any(String),
          user: {
            email: 'user@test.com',
            _id: expect.any(String)
          }
        });
      });
  });

  it('verifies using token', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'tester', password: '1234' })
      .then(created => {
        console.log(created.body.token);
        return request(app)
          .get('/auth/verify')
          .set('Authorization', created.body.token)
          .then(res => {
            expect(res.body).toEqual({ _id: expect.any(String), email: 'tester' });
          });
      });
  });
});
