require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || 'unicorn_user',
  password: process.env.DB_PASSWORD || 'magical_password',
  database: process.env.DB_NAME || 'nulp_database',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5434',
  dialect: process.env.DB_DIALECT || 'postgres',
  seederStorage: 'sequelize',
  operatorsAliases: 0,
  logging: console.log
};
