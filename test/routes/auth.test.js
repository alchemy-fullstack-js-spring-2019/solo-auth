const request = require('supertest');
const app = require('../../lib/app');
require('../data-helper');

describe('auth routes', () => {
  it.only('creates a new user on signup and returns user and token', () => {
    return request(app)
      .post('/signup')
      .send({
        email: 'cara@email.com',
        password: 'pwpwpw123'
      })
      .then(res => {
        expect(res).toEqual({ 
          email: 'cara@email.com', password: 'pwpwpw123' }, 
        expect.any(String) 
        );
      });
  });
});

