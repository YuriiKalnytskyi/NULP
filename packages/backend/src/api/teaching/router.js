const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get(
  '/',
  // asyncHandler(middlewares.auth.user),
  asyncHandler(controller.getTeaching.get)
);

router.post(
  '/add/newTeaching',
  // asyncHandler(middlewares.auth.user),
  // validator.main(schemas.router.addTeaching.put),
  asyncHandler(controller.addTeaching.put)
);

router.post(
  '/delete/teaching',
  // asyncHandler(middlewares.auth.user),
  validator.main(schemas.router.deleteTeaching.delete),
  asyncHandler(controller.deleteTeaching.delete)
);

module.exports = router;
