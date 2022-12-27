const Sequelize = require('sequelize');

module.exports = class ForgotPasswords extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        code: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
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
