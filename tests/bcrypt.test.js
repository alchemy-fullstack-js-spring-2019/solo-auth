const bcrypt = require('bcryptjs');
const hash = require('../lib/utils/hash');
const compare = require('../lib/utils/compare');

describe('bcrypt', () => {
    it('hashes a password', () => {
        const password = 'password';
        return bcrypt.hash(password, 10)
            .then(hashedPassword => {
                return Promise.all([
                    Promise.resolve(hashedPassword),
                    bcrypt.hash(password, 10)
                ]);
            })
            .then(([hash1, hash2]) => {
                expect(hash1).not.toEqual(hash2);
            });
    });

    it('creates the same hash given the same salt', () => {
        const password = 'password';
        const salt = '$2b$10$AAAAAAAAAAAAAAAAAAAAAA';

        return bcrypt.hash(password, salt)
            .then(hashedPassword => {
                return Promise.all([
                    Promise.resolve(hashedPassword),
                    bcrypt.hash(password, salt)
                ]);
            })
            .then(([hash1, hash2]) => {
                expect(hash1).toEqual(hash2);
            });
    });

    it('has a hash function that returns a hashed pw', () => {
        const password = 'password';
        return hash(password)
            .then(hashed => {
                expect(hashed).toEqual(expect.any(String));
                expect(hashed).not.toEqual(password);
            });
    });

    it('has a compare function that returns true if password and hash match', () => {
        const password = 'password';
        return hash(password)
            .then(hashed => {
                return compare(password, hashed);
            })
            .then(result => {
                expect(result).toBeTruthy();
            });
    });

    it('returns false if comparison doesnt match', () => {
        const password = 'password';
        return hash(password)
            .then(hashed => {
                return compare('passwordWrong', hashed);
            })
            .then(result => {
                expect(result).toBeFalsy();
            });
    });
});
