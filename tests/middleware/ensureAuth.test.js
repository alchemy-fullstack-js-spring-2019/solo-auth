require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth, findAuthToken } = require('../../lib/middleware/ensureAuth');

describe('ensure auth middleware', () => {
    it('findAuthToken', () => {
        
    });
    
    it('validates a good token', done => {
        const token = tokenize({
            email: 'test@test.com'
        });
        
        const req = { token };
        const res = {};
        const next = () => {
            expect(req.user).toEqual({
                email: 'test@test.com'
            });
            done();
        };

        ensureAuth(req, res, next);
    });
});
