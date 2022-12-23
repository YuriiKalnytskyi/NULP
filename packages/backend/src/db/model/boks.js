const Sequelize = require('sequelize');

module.exports = class Boks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        middleName: DataTypes.STRING,
        photo: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate() {}
};
