const bcryptjs = require('bcryptjs');

const bcrypt = password => bcryptjs.hash(password, 10);

module.exports = bcrypt;
