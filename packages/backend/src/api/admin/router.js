const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/add/notification',
    asyncHandler(middlewares.auth.admin),
    validator.main(schemas.router.addNotification.post),
    asyncHandler(controller.addNotification.post),
);

module.exports = router;
