const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        password: Sequelize.STRING,
        accessToken: Sequelize.TEXT,
        role: {
          type: Sequelize.ENUM('USER', 'ADMIN', 'TEACHER'),
          allowNull: false,
          defaultValue: 'USER'
        }
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
