const jw = require('jsonwebtoken');

function tokenize(payload){

    const token = jw.sign(payload);

}


module.exports = tokenize;
