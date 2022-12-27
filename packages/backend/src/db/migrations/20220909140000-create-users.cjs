module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      password: Sequelize.STRING,
      accessToken: Sequelize.TEXT,
      role: {
        type: Sequelize.ENUM('USER', 'ADMIN', 'TEACHER'),
        allowNull: false,
        defaultValue: 'USER',
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
