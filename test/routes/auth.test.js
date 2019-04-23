const request = require('supertest');
const app = require('../../lib/app');
require('../data-helper');

describe('auth routes', () => {
  it.only('creates a new user on signup and returns user and token', () => {
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

  
});

