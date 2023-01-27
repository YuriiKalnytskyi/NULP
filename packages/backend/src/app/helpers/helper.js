module.exports = {
  config: require('./config.helper'),
  header: require('./header.helper'),
  doom: require('./doom.helper'),
  validator: require('./validator.helper'),
  general: require('./general.helper'),
  controller: require('./controller.helper'),
  token: require('./token.helper'),
  mailer: require('./mailer.helper'),
  cloudinary: require('./cloudinary.helper'),

  middlewares: {
    auth: require('../middlewares/auth.handler'),
    cors: require('../middlewares/cors.handler'),
    error: require('../middlewares/error.handler'),
    notFound: require('../middlewares/not-found.handler')
  }
};
