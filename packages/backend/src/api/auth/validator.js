const Joi = require('joi');

const schemas = {
  router: {
    registration: {
      post: Joi.object()
        .keys({
          firstName: Joi.string().trim().required(),
          lastName: Joi.string().trim().required(),
          email: Joi.string().trim().email().required(),
          password: Joi.string().trim().required()
        })
        .required()
    },
    login: {
      post: Joi.object()
        .keys({
          email: Joi.string().trim().email().required(),
          password: Joi.string().trim().required(),
          deviceToken: Joi.object().optional()
        })
        .required()
    },
    forgotPassword: {
      post: Joi.object()
        .keys({
          email: Joi.string().email().required()
        })
        .required()
    },
    verifyCode: {
      post: Joi.object()
        .keys({
          email: Joi.string().email().required(),
          code: Joi.string().required()
        })
        .required()
    },
    changePassword: {
      put: Joi.object()
        .keys({
          email: Joi.string().required(),
          newPassword: Joi.string().required(),
          repeatNewPassword: Joi.string().required()
        })
        .required()
    }
  }
};

module.exports = {
  schemas
};
