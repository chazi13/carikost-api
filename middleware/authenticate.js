const jwt = require('express-jwt');

exports.authorize = jwt({secret: 'mamikost-key'});
