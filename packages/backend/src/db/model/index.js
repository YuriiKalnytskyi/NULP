const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const db = require('../../app/helpers/db');

const sequelize = new Sequelize(db);

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
