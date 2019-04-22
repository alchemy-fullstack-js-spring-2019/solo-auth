const jwt = require('jsonwebtoken');

describe('jwt token', () => {
    it('can create a token', () => {
        const token = jwt.sign({
            payload: {
                _id: '1234',
                email: 'test@test.com'
            }
        }, 's3cret', { expiresIn: '1h' });

        expect(token).toEqual(expect.any(String));
    });
});
