const express = require('express');
require('express-group-routes');
const app = express();

const AuthController = require('../controllers/auth-controller');

app.group('/api/v1', router => {
    router.post('/register', AuthController.register);
    router.post('/login', AuthController.login);
})

module.exports = app;
