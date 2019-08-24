const express = require('express');
require('express-group-routes');
const app = express();
const auth = require('../middleware/authenticate');

const BookController = require('../controllers/book-controller');

app.group('/api/v1', router => {
    router.get('/booking/all', auth.authorize, BookController.show);
    router.get('/booking/detail/:id', auth.authorize, BookController.showdetail);
    router.post('/booking/add', auth.authorize, BookController.store);
    router.patch('/booking/:id', auth.authorize, BookController.edit)
})

module.exports = app;
