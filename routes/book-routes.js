const express = require('express');
require('express-group-routes');
const app = express();
const auth = require('../middleware/authenticate');

const BookController = require('../controllers/book-controller');

app.use(auth.authorize);
app.use(auth.handleAuthError());
app.group('/api/v1', router => {
    router.get('/booking/all', BookController.show);
    router.get('/booking/detail/:id', BookController.showdetail);
    router.post('/booking/add', BookController.store);
    router.patch('/booking/:id', BookController.edit)
})

module.exports = app;
