const Sequelize = require('sequelize');

module.exports = class Notifications extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
          description: DataTypes.TEXT
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
