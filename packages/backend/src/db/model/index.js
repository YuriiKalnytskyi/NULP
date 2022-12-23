const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,

  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    seederStorage: 'sequelize',
    operatorsAliases: 0,
    logging: console.log
  }
);

const dirname = path.join(process.cwd(), 'src', 'db', 'model') + '/';

const files = fs
  .readdirSync(dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== path.basename('index.js') && file.slice(-3) === '.js'
  );

const initModel = () => {
  const models = {};

  for (const file of files) {
    const model = require(`./${file}`);
    models[`${model.name}`] = model.init(sequelize, Sequelize);
  }

  return models;
};

const models = initModel();

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

module.exports = {
  ...models,
  sequelize,
  Sequelize
};
