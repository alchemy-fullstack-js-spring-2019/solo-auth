const User = require('../../lib/models/User');
const { bcrypt } = require('../../lib/utils/hash');

describe('User tests', () => {
  it('validates good model', () => {
    const user = new User({ email: 'email@aol.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'email@aol.com',
      _id: expect.anything()
    });
  });

  it('has email required', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('has a temp pw', () => {
    const user = new User({
      email: 'email@aol.com',
      passwordVirtual: 'flanderssucks'
    });

    expect(user._tempPassword).toEqual('flanderssucks');
  });

  it('compares a good pw using a method', () => {

    const user = new User({
      email: 'email@aol.com',
      passwordVirtual: 'flanderssucks'
    });

    expect(user.compare(passwordVirtual)).toBeTruthy();
  });
});
