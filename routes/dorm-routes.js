const express = require('express');
require('express-group-routes');

const auth = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const DormController = require('../controllers/dorm-controller');

const app = express();

app.group('/api/v1/dorms/', router => {
    router.get('/', DormController.index);
    router.get('/:id', DormController.show);
    router.post('/', auth.authorize, upload.array('images', 20), DormController.store);
});

module.exports = app;
