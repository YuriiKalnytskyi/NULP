const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get(
  '/',
  // asyncHandler(middlewares.auth.user),
  asyncHandler(controller.getNews.get)
);

router.post(
  '/add/newsNews',
  // asyncHandler(middlewares.auth.user),
  // validator.main(schemas.router.addNews.put),
  asyncHandler(controller.addNews.put)
);

router.post(
  '/delete/news',
  // asyncHandler(middlewares.auth.user),
  validator.main(schemas.router.deleteNews.delete),
  asyncHandler(controller.deleteNews.delete)
);

module.exports = router;
