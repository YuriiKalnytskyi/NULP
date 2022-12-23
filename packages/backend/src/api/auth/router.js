const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post(
  '/registration',
  validator.main(schemas.router.registration.post),
  asyncHandler(controller.registration.post)
);

router.post(
  '/login',
  validator.main(schemas.router.login.post),
  asyncHandler(controller.login.post)
);

router.post('/logout', asyncHandler(middlewares.auth.user), asyncHandler(controller.logout.post));

router.post(
  '/forgot/password',
  validator.main(schemas.router.forgotPassword.post),
  asyncHandler(controller.forgotPassword.post)
);

router.post(
  '/verify/code',
  validator.main(schemas.router.verifyCode.post),
  asyncHandler(controller.verifyCode.post)
);

router.post(
  '/change/password',
  validator.main(schemas.router.changePassword.put),
  asyncHandler(controller.updatePassword.put)
);

module.exports = router;
