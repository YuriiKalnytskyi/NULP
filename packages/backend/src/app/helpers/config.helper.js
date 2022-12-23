const config = require('config');
const env = process.env;
require('dotenv').config({ path: './.env' });

config.regExp = {
  password: new RegExp('^\\S{6,128}$')
};

config.general = {
  host: env.HOST,
  port: env.PORT,
  link: env.LINK,
  fullMode: env.FULL_MODE
};

config.loading = {
  simulateLoading: env.SIMULATELOADING,
  maxLoading: env.MAXLOADING,
  minLoading: env.MINLOADING
};

config.morgan = {
  name: env.MORGAN_NAME,
  format: env.MORGAN_FORMAT,
  morganBody: env.MORGANBODY
};

config.database = {
  user: env.DBUSER,
  host: env.DBHOST,
  database: env.DATABASE,
  password: env.DBPASSWORD,
  port: env.DBPORT,
  limit: env.DBLIMIT
};

config.JWT = {
  secret: {
    user: {
      accessToken: env.ACCESSTOKEN,
      refreshToken: env.REFRESHTOKEN,
      paymentsToken: env.PAYMENTSTOKEN
    }
  },
  lifetime: {
    accessToken: env.LIFETIMEACCESSTOKEN,
    refreshToken: env.LIFETIMEREFRESHTOKEN,
    paymentsToken: env.LIFETIMEPAYMENTSTOKEN
  }
};

config.userStatus = {
  login: 'login',
  logout: 'logout'
};

config.fondyCredential = {
  merchant_id: env.FONDY_MERCHANT_ID,
  secretKey: env.FONDY_SECRET_KEY
};

config.paymentsInfo = {
  firstPaymentAmount: env.FIRSTPAYMENTSAMOUNT,
  nextPaymentAmount: env.NEXTPAYMENTSAMOUNT,
  paymentCurrency: env.PAYMENTSCURRENCY
};

config.mailerInfo = {
  user: env.MAILER_USER,
  mailerApiKey: env.MAILER_API_KEY,
  mailerTemplateId: env.MAILER_TEMPLATE_ID
};

config.mailerInfo = {
  user: env.MAILER_USER,
  mailerApiKey: env.MAILER_API_KEY,
  mailerTemplateId: env.MAILER_TEMPLATE_ID
};

config.appleInfo = {
  bundleId: env.APP_BUNDLE_ID,
  keyId: env.APP_KEY_ID,
  teamId: env.APP_TEAM_ID,
  apnProd: env.APN_PRODUCTION
};

config.cloudinary = {
  cloudinaryName: env.CLOUDINARY_NAME,
  cloudinaryApiKey: env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: env.CLOUDINARY_API_SECRET
};

module.exports = config;
