const Sequelize = require('sequelize');

module.exports = class News extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.JSONB,
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
