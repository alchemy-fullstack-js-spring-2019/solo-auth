const bcrypt = require('bcryptjs');
const hash = require('../../lib/utils/hash');
const hashCompare = require('../../lib/utils/hash-compare');

describe('brypt', ()=> {
    it('hashes a password', ()=>{
        const password = 'password';
        return bcrypt.hash(password, 10)
            .then(hashed=>{
                return Promise.all([
                    Promise.resolve(hashed),
                    bcrypt.hash(password, 10)
                ]);
            })
            .then(([pass1, pass2])=>{
                console.log('pass 1', pass1);
                return expect(pass1).toBeDefined();
            });
    });
    it('creates passwords that are different', ()=>{
        const password = 'password';
        return bcrypt.hash(password, 10)
            .then(hashed=>{
                return Promise.all([
                    Promise.resolve(hashed),
                    bcrypt.hash(password, 10)
                ]);
            })
            .then(([pass1, pass2])=>{
                expect(pass1).not.toEqual(pass2);
            });
    });
    it('creates same hash with same salt', ()=>{
        const salt = '$2b$10$dddddddddddddddddddddd';
        const password = 'password';
        return bcrypt.hash(password, salt)
            .then(hashed=>{
                return Promise.all([
                    Promise.resolve(hashed),
                    bcrypt.hash(password, salt)
                ]);
            })
            .then(([pass1, pass2])=>{
                expect(pass1).toEqual(pass2);
            });
    });
    
    it('can compare hashes base on the same password', ()=>{
        const password = 'password';
        return bcrypt.hash(password, 10)
            .then(hashed => {
                return bcrypt.compare(password, hashed);
            })
            .then(answer=>{
                expect(answer).toBeTruthy();
            });
    });
    it('takes hash function, given password you get a hash', ()=>{
        const password = 'password';
        return hash(password)
            .then(hash=>{
                expect(hash).toEqual(expect.any(String));
            });
    });
    it('takes hashCompare function, compares a password to hash to see if true', ()=>{
        const password = 'password';
        return hashCompare(password)
            .then(hashResult=>{
                expect(hashResult).toBeTruthy();
            });
    });
})
;

