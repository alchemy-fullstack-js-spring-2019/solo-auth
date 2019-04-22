const jw = require('jsonwebtoken');
require('dotenv').confid();

describe('jwt token', ()=>{
    it('jwt token', ()=>{
        const token = jw.sign({
            payload: {
                _id:'123',
                email:'test@gmail.com'
            }
        });
    });
});
