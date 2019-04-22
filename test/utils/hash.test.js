const bcrypt = require('bcryptjs');

describe('brypt', ()=> {
    it('hashes a password', ()=>{
        const password = 'password';
        bcrypt.hash(password, 10)
            .then(hashed=>{
                return Promise.all([
                    Promise.resolve(hashed),
                    bcrypt.hash(password, 10)
                ]);
            })
            .then(([pass1, pass2])=>{
                expect(pass1).toEqual(pass2);
            });
    });
})
;
