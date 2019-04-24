const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../lib/utils/token');
require('dotenv').config();  

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

    it('tests tokenize function', () => {
        const payload = {
            _id: '1234',
            email: 'test@test.com'
        }

        const token = tokenize(payload)

        expect(token).toEqual(expect.any(String));
    });

    it('can verify a token and untokenize', () => {
        const token = tokenize({
            _id: '1234',
            email: 'test@test.com'
        });

        expect(untokenize(token)).toEqual({
            _id: '1234',
            email: 'test@test.com'
        });
    });
});
