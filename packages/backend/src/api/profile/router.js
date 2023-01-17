const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get(
  '/info',
  asyncHandler(middlewares.auth.user),
  asyncHandler(controller.getProfileInfo.get)
);

router.post(
  '/change/password',
  asyncHandler(middlewares.auth.user),
  validator.main(schemas.router.changePassword.put),
  asyncHandler(controller.changePassword.put)
);

router.post(
  '/delete/account',
  asyncHandler(middlewares.auth.user),
  validator.main(schemas.router.deleteAccount.post),
  asyncHandler(controller.deleteAccount.delete)
);

module.exports = router;
