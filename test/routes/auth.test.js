require('../connect-db');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth routes', () => {
  it('can sign up a user', () => {
    const newUser = { email: 'test@test.com', password: 'password1234' };
    return request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return User.create({
      email: 'test@test.com',
      password: 'pass123'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'test@test.com',
            password: 'pass123'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });
});
