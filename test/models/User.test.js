const User = require('../../lib/models/User');

describe('User', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'person@test.com' });
    expect(user.toJSON().email).toEqual('person@test.com');
    expect(user.toJSON()._id.toString()).toEqual(expect.any(String));
  });
});
