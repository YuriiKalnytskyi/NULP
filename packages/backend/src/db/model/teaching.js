const Sequelize = require('sequelize');

module.exports = class Teachings extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: DataTypes.STRING,
        lesson: DataTypes.STRING,
        description: DataTypes.JSONB,
        subject: DataTypes.STRING
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
