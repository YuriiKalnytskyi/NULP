const Joi = require('joi');

const schemas = {
    router: {
       addNotification: {
            post: Joi.object().keys({
                description: Joi.string().required(),
            }).required(),
        },
    },
};

module.exports = {
    schemas,
};

