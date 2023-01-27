const Joi = require('joi');

const schemas = {
  router: {
    addNews: {
      put: Joi.object()
        .keys({
          title: Joi.string().required(),
          lesson: Joi.string().required(),
          subject: Joi.string().required(),
          text: Joi.string().optional(),
          link: Joi.string().optional(),
          images: Joi.optional()
        })
        .required()
    },

    deleteNews: {
      delete: Joi.object()
        .keys({
          teachingId: Joi.number().required()
        })
        .required()
    }
  }
};

module.exports = {
  schemas
};
