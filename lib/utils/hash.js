const bcrypt = require('bcryptjs');

module.exports = password => bcrypt.hash(password, '$2$10$01234567899876543210ha');
