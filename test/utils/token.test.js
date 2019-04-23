require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');
const jwt = require('jsonwebtoken');

describe('jwt token', () => {
    it('can create a token', () => {
        const token = tokenize({
            _id: '1234',
            email: 'test@test.com'
        });

        expect(token).toEqual(expect.any(String));
    });

    it('can verify a token', () => {
        const token = tokenize({
            name: 'spot',
            age: 12
        });

        const obj = jwt.verify(token, process.env.AUTH_SECRET);

        expect(obj.payload).toEqual({
            name: 'spot',
            age: 12
        });

    });
    it('extract sign', ()=>{
        const token = tokenize({
            name: 'spot',
            age: 12
        }); 
        const unToken = untokenize(token);
        expect(unToken).toEqual({
            name: 'spot',
            age: 12
        });
            

    });
});
