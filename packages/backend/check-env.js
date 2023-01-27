const Joi = require('joi');

require('dotenv').config();

const envSchema = {
  ENV: Joi.string().required(),
  PORT: Joi.number().required(),

  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DIALECT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),

  ACCESSTOKEN: Joi.string().required(),
  REFRESHTOKEN: Joi.string().required(),
  RESTOREPASSWORDTOKEN: Joi.string().required(),
  PAYMENTSTOKEN: Joi.string().required(),

  LIFETIMEACCESSTOKEN: Joi.string().required(),
  LIFETIMEREFRESHTOKEN: Joi.string().required(),
  LIFETIMERESTOREPASSWORDTOKEN: Joi.string().required(),
  LIFETIMEPAYMENTSTOKEN: Joi.string().required(),

  MORGANBODY: Joi.boolean().required(),
  MORGAN_NAME: Joi.string().required(),
  MORGAN_FORMAT: Joi.string().required()
};

const envVariables = process.env;

async function handleValidation() {
  try {
    for (const key in envSchema) {
      try {
        await envSchema[key].validateAsync(envVariables[key]);
      } catch (e) {
        throw new Error(`⛔️ Validation of : ${key} is undefined! ⛔️`);
      }
    }

    console.log(`✅ Success! Env[${process.env.ENV}] validation was successfully passed! ✅`);
  } catch (e) {
    console.log('Environment variables validation failed. Check your dotenv variables:');
    console.error(e);
    process.exit(1);
  }
}

handleValidation();
