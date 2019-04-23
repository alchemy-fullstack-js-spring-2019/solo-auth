require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth, findAuthToken } = require('../../lib/middleware/ensureAuth');

describe('ensure auth middleware', () => {
    it('findAuthToken', done => {
        const req = { get: () => 'Bearer tokenfjdjkafjdkslfj' };
        const res = {};
        const next = () => {
            expect(req.token).toEqual('tokenfjdjkafjdkslfj');
            done();
        };

        findAuthToken(req, res, next);
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
