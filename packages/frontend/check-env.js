const Joi = require('joi');

require('dotenv').config();

const envSchema = {
  ENV: Joi.string().required(),
  REACT_APP_API_URL: Joi.string().required(),
}

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
