const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

require('../data-helper');

describe('auth routes', () => {
  it('creates a new user on signup and returns user and token', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        email: 'cara@email.com',
        password: 'pwpwpw123'
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: 
      { email: 'cara@email.com', _id: expect.any(String) }, 
          token: expect.any(String)
        });
      });
  });

  it('compares user on signin', () => {
    return User.create({
      email: 'cara@email.com',
      password: '4242rar'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'cara@email.com',
            password: '4242rar'
          });
      }) 
      .then(res => {
        expect(res.body).toEqual({
          user: 
            { email: 'cara@email.com', _id: expect.any(String) }, 
          token: expect.any(String)
        });
      });
  });




});

