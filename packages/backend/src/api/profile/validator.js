const Joi = require('joi');

const schemas = {
    router: {
        changePassword: {
            put: Joi.object().keys({
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required(),
                repeatNewPassword: Joi.string().required(),
            }).required(),
        },

        deleteAccount: {
            post: Joi.object().keys({
                password: Joi.string().required(),
            }).required(),
        },

    },
};

module.exports = {
    schemas,
};
