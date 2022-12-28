const Sequelize = require('sequelize');

module.exports = class Teachings extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: DataTypes.STRING,
        lesson: DataTypes.STRING,
        description: Sequelize.JSONB,
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true
      }
    );
  }

  static associate() {}
};
